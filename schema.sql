CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products (
    ItemID INTEGER(11) AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(50) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price FLOAT(7, 2) NOT NULL,
    StockQuantity INTEGER(7) NOT NULL,
    PRIMARY KEY (ItemID)
);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Apple Airpods', 'Electronics', 164.98, 50);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Roku 4', 'Electronics', 85.00, 200);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Bowflex SelectTech 552 Adjustable Dumbbells (Pair)', 'Sports', 299.00, 300);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Hasbro Ouija Board with Storage Bag', 'Toys and Games', 17.99, 1000);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Jenga GIANT Genuine Hardwood Game', 'Toys and Games', 90.90, 20);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('LEGO Architecture 21019 The Eiffel Tower', 'Toys and Games', 30.99, 40);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Pilot G2 Retractable Premium Gel Ink Roller Ball Pens, Fine Point, Assorted Colors, 8-Pack', 'Office Supplies', 9.29, 400);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Mr. Coffee 12-Cup Programmable Coffee Maker with Thermal Carafe in Chrome', 'Kitchen', 29.96, 10);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Classic Brands Reversible Cool Gel and Memory Foam Pillow in Standard', 'Home', 27.99, 30);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Telescopic Paddle', 'Sports', 23.99, 75);

CREATE TABLE Departments (
    DepartmentID INTEGER(11) AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    OverHeadCosts FLOAT(7, 2) NOT NULL,
    TotalSales FLOAT(7, 2) NOT NULL,
    PRIMARY KEY (DepartmentID)
);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales)
VALUES ('Electronics', 2000, 0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales)
VALUES ('Sports', 300, 0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales)
VALUES ('Toys and Games', 400, 0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales)
VALUES ('Office Supplies', 300, 0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales)
VALUES ('Kitchen', 100, 0);

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales)
VALUES ('Home', 100, 0);
