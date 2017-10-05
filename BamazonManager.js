//node modules
var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

//connect to mysql database and run the managerPrompt function
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    managerPrompt();
});

//prompt the user to select what they would like to do and run a function accordingly
function managerPrompt(){
  inquirer.prompt([
    {
    name: 'choice',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View Products For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product', 'Exit']
    }
  ]).then(function(user){
    console.log(user.choice);
    switch(user.choice) {
          case 'View Products For Sale':
              viewProductsForSale(function(){
                managerPrompt();
              });
          break;

          case 'View Low Inventory':
              viewLowInventory(function(){
                managerPrompt();
              });
          break;

          case 'Add To Inventory':
              addToInventory();
          break;

          case 'Add New Product':
              addNewProduct();
          break;

          case 'Exit':
              connection.end();
          break;
      }
    });
}

//function to print all items to the console, uses npm module cli-table
function viewProductsForSale(cb){
 
  var table = new Table({
    head: ['ID Number', 'Product', 'Department', 'Price', 'Quantity Available']
  });
  
  connection.query('SELECT * FROM Products', function(err, res){
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].ItemID, res[i].ProductName, res[i].DepartmentName, '$' + res[i].Price.toFixed(2), res[i].StockQuantity]);
    }
   
    console.log(table.toString());
    
    cb();
    });
}

//function to view all items where StockQuantity is less than 5
function viewLowInventory(cb){
  
  connection.query('SELECT * FROM Products WHERE StockQuantity < 5',
  function(err, res){
    if(err) throw err;
   
    if (res.length === 0) {
      console.log('There are no items with low inventory.');

      cb();
    } else {
    
      var table = new Table({
        head: ['ID Number', 'Product', 'Department', 'Price', 'Quantity Available']
      });
      for (var i = 0; i < res.length; i++) {
        table.push([res[i].ItemID, res[i].ProductName, res[i].DepartmentName, '$' + res[i].Price.toFixed(2), res[i].StockQuantity]);
      }
      
      console.log(table.toString());
      console.log('These items are low on inventory.');
      
      cb();
    }
  });
}

//function to add more inventory to items
function addToInventory(){
  var items = [];
 
  connection.query('SELECT ProductName FROM Products', function(err, res){
    if (err) throw err;
    
    for (var i = 0; i < res.length; i++) {
      items.push(res[i].ProductName)
    }
    
    inquirer.prompt([
      {
      name: 'choices',
      type: 'checkbox',
      message: 'Which products would you to add inventory for?',
      choices: items
      }
    ]).then(function(user){
     
        if (user.choices.length === 0) {
          console.log('Oops! You didn\'t select anything!');
          managerPrompt();
        } else {

          howMuchInventory(user.choices);
        }
      });
  });
}


function howMuchInventory(itemNames){

  var item = itemNames.shift();
  var itemStock;

  connection.query('SELECT StockQuantity FROM Products WHERE ?', {
    ProductName: item
  }, function(err, res){
    if(err) throw err;
    itemStock = res[0].StockQuantity;
    itemStock = parseInt(itemStock)
  });

  inquirer.prompt([
    {
    name: 'amount',
    type: 'text',
    message: 'How many ' + item + ' would you like to add?',

    validate: function(str){
        if (isNaN(parseInt(str))) {
          console.log('\nOops. That\'s not a valid number!');
          return false;
        } else {
          return true;
        }
      }
    }
  ]).then(function(user){
    var amount = user.amount
    amount = parseInt(amount);

    connection.query('UPDATE Products SET ? WHERE ?', [
    {
      StockQuantity: itemStock += amount
    },
    {
      ProductName: item
    }], function(err){
      if(err) throw err;
    });

    if (itemNames.length != 0) {
        howMuchInventory(itemNames);
      } else {

        console.log('Inventory has been updated.');
        managerPrompt();
      }
    });
}


function addNewProduct(){
  var departments = [];

  connection.query('SELECT DepartmentName FROM Departments', function(err, res){
    if(err) throw err;
    for (var i = 0; i < res.length; i++) {
      departments.push(res[i].DepartmentName);
    }
  });
 
  inquirer.prompt([
    {
    name: 'item',
    type: 'text',
    message: 'What is the product name of the item you would like to add?'
    },
    {
    name: 'department',
    type: 'list',
    message: 'Which department does this item belong to? If you need to add a department you will need an executive to do that.',
    choices: departments
    },
    {
    name: 'price',
    type: 'text',
    message: 'What is the price of this item?'
    },
    {
    name: 'stock',
    type: 'text',
    message: 'How many of this item do we have in stock currently?'
    }
  ]).then(function(user){

      var item = {
        ProductName: user.item,
        DepartmentName: user.department,
        Price: user.price,
        StockQuantity: user.stock
      }

      connection.query('INSERT INTO Products SET ?', item,
      function(err){
        if(err) throw err;
        console.log(item.ProductName + ' has been successfully added to the inventory.');
 
        managerPrompt();
      });
    });
}
