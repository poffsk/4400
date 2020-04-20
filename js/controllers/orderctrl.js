const fs = require("fs");
myApp.controller("orderCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  const errormsg = require("../js/controllers/errormsg.js");
  $scope.mytest = "No data yet!";


  $scope.defineTruck = function() {
    console.log(window.location.href);
    var url = new URL(window.location.href);
    var search = new URLSearchParams(url.search);
    console.log(search.get("foodTruckName"));
    $scope.foodTruckName = search.get("foodTruckName");
    //$scope.foodTruckName = FoodTruckYoureLookingFor
  }

  $scope.defineUsername = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if (obj.length > 0) {
      username = obj[0].username;
      $scope.username = username;
    }
  }


  $scope.doQuery = function() {
    conn.getRows(handleTableData, 'select foodName, price from menuItem where foodTruckName = "' + $scope.foodTruckName + '"');
  }


  $scope.doTableQuery = function() {
    conn.getRows(handleTableData, 'select foodName, price from menuItem where foodTruckName = "' + $scope.foodTruckName + '"');
  }


  function handleTableData(rows) {
    console.log(rows);
    var tableList = [];
    for (var tableRow of rows) {
      tableRow.selected = false;
      tableRow.i_purchaseQuantity = 0;
      tableList.push(tableRow);
    }
    $scope.tableList = tableList;
    $scope.$apply();
  }


  $scope.filterDate = function(i_date) {
    $scope.newDate = $scope.i_date.toISOString().substring(0, 10);
    console.log($scope.newDate);
  }

  $scope.backInfo = function() {
    window.location.href = 'CurrentInformation.html';
  }

  $scope.goSubmit = function() {
    errormsg.closeErrorMsg();
    if (typeof $scope.i_date != "undefined") {
      //// TODO: need to select a date and/or truck to order from
      $scope.filterDate($scope.i_date);
      console.log('CALL cus_order("' + $scope.newDate + '", "' + $scope.username + '")')
      conn.getRows($scope.defineOrderID, 'CALL cus_order("' + $scope.newDate + '", "' + $scope.username + '")');
    }
    else {errormsg.showErrorMsg("error", "Please enter a date");}
  }

  $scope.defineOrderID = function() {
    conn.getRows(getOrderID, 'select max(orderID) as orderID from orders where customerUsername = "' + $scope.username + '"');
  }



  function getOrderID(rows) {
    console.log(rows);
    $scope.orderID = rows[0].orderID;
    $scope.$apply();
    $scope.doOrderCall();
  }

  $scope.defineCusBalance = function() {
    console.log('CALL cus_order("' + $scope.newDate + '", "' + $scope.username + '")');
    conn.getRows(getCusBalance, 'select balance from customer where username = "' + $scope.username + '"');
  }

  function getCusBalance(rows) {
    console.log(rows);
    $scope.balance = rows[0].balance;
    $scope.$apply();
  }

  $scope.doOrderCall = function() {
    console.log('do Order Call has been called');
    console.log($scope.tableList);
    var totalOrderCost = 0;
    for (menuItem of $scope.tableList) {
      if (menuItem.selected) {
        totalOrderCost += (menuItem.price) * (menuItem.i_purchaseQuantity);
        console.log(totalOrderCost);
      }
    }
    if (totalOrderCost > 0 && $scope.balance >= totalOrderCost) {
      for (foodItem of $scope.tableList) {
        console.log(foodItem.selected);
        if (foodItem.selected == true) {
          console.log('CALL cus_add_item_to_order("' + $scope.foodTruckName + '", "' + foodItem.foodName + '", "' + foodItem.i_purchaseQuantity + '", "' + $scope.orderID + '", "' + totalOrderCost + '")')
          conn.getRows(handleOrderData, 'CALL cus_add_item_to_order("' + $scope.foodTruckName + '", "' + foodItem.foodName + '", "' + foodItem.i_purchaseQuantity + '", "' + $scope.orderID + '", "' + totalOrderCost + '")');
        }
      }
    }
    else {errormsg.showErrorMsg("error","I'm sorry, we cannot accept this order")}
  }

  // handleData
  function handleOrderData(rows) {
    console.log(rows);
    errormsg.showErrorMsg("success","Thank you for your order!", 5);
    $scope.doTableQuery();
    $scope.defineCusBalance();
  }


  $scope.defineTruck();
  $scope.defineUsername();
  $scope.doTableQuery();
  $scope.defineCusBalance();

});
