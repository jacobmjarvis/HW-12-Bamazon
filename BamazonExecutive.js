//node modules
var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');

//sql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

//connect to mysql and run executivePrompt function
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    executivePrompt();
});

//prompt the user
function executivePrompt(){
  inquirer.prompt([
  {
    name: 'choice',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View Product Sales By Department', 'Add A Department', 'Exit']
  }
  ]).then(function(user){

    if (user.choice === 'View Product Sales By Department') {
      viewProductSalesByDepartment();
    } else if(user.choice === 'Add A Department'){

      addDepartment();
    } else if (user.choice === 'Exit') {
      connection.end();
    }
  });
}

function viewProductSalesByDepartment(){
  //new cli-table
  var table = new Table({
    head: ['ID Number', 'Department', 'Overhead Costs', 'Total Sales', 'Total Profit']
  });

  connection.query('SELECT * FROM Departments', function(err, res){
    if(err) throw err;

    for (var i = 0; i < res.length; i++) {
      var id = res[i].DepartmentID;
      var department = res[i].DepartmentName;
      var overhead = res[i].OverHeadCosts;
      overhead = overhead.toFixed(2);
      var totalSales = res[i].TotalSales;
      totalSales = totalSales.toFixed(2);
      var TotalProfit = totalSales - overhead;
      TotalProfit = TotalProfit.toFixed(2);
      table.push([id, department, '$' + overhead, '$' + totalSales, '$' + TotalProfit]);
    }

    console.log(table.toString());

    executivePrompt();
  });
}

function addDepartment(){
  //prompt the user for all of the information needed for the new department
  inquirer.prompt([
    {
    name: 'name',
    type: 'text',
    message: 'What is the name of the department you would like to add?'
    },
    {
    name: 'overhead',
    type: 'text',
    message: 'What is the overhead for the department you would like to add?',

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
      //create an object with all of the department properties
      var OverHeadCosts = parseInt(user.overhead);
      var department = {
        DepartmentName: user.name,
        OverHeadCosts: OverHeadCosts,
        TotalSales: 0
      }

      connection.query('INSERT INTO Departments SET ?', department,
      function(err){
        if(err) throw err;
        console.log(department.DepartmentName + ' has been successfully added to the departments table.');

        executivePrompt();
      });
    });
}
