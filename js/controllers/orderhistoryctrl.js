const fs = require("fs");
myApp.controller("orderhistoryCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  $scope.defineUsername = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if (obj.length > 0) {
      managerUsername = obj[0].username
      $scope.username = username;
    }
  }


  $scope.doCall = function() {
    conn.getRows($scope.doQuery, 'CALL cus_order_history("' + $scope.username '")')
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

  $scope.getDisBitchSumData = function() {
    console.log($scope.i_buildingName);
  }

  $scope.doCall()

});
