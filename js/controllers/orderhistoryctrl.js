const fs = require("fs");
myApp.controller("orderhistoryCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  $scope.defineUsername = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if (obj.length > 0) {
      username = obj[0].username;
      $scope.username = username;
    }
  }


  $scope.doCall = function() {
    conn.getRows($scope.doQuery, 'CALL cus_order_history("' + $scope.username + '")');
  }


  $scope.doQuery = function() {
    conn.getRows(handleTableData, 'select * from cus_order_history_result');
  }

  function handleTableData(rows) {
    console.log(rows);
    var tableList = [];
    for (var tableRow of rows) {
      tableList.push(tableRow);
      $scope.tableList = tableList;
      $scope.$apply($scope.tableList);
    }
  }


  $scope.goHome = function() {
    console.log('Help');
    window.location.href = 'Home.html';
  }

  $scope.filterDate = function(i_date) {
    $scope.newDate = $scope.i_date.toISOString().substring(0, 10);
    console.log($scope.newDate);
  }

  $scope.cleanDate = function(dateToClean){
    var dateFormat = require('dateformat');
    var day=dateFormat(dateToClean, "yyyy-mm-dd");
    return day;
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



$scope.defineUsername()
$scope.doCall()

});
