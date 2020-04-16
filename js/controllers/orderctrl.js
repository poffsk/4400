const fs = require("fs");
myApp.controller("orderCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  $scope.defineTruck = function() {
    console.log(window.location.href);
    var url = new URL(window.location.href);
    var search = new URLSearchParams(url.search);
    console.log(search.get("foodTruckName"));
    $scope.foodTruckName = search.get("foodTruckName");
    $scope.foodTruckName = FoodTruckYoureLookingFor
  }

  $scope.defineUsername = function() {
  test = fs.readFileSync('usersession.json');
  console.log(test.toString());
  var obj = JSON.parse(test);
  if (obj.length > 0) {
    managerUsername = obj[0].username
    $scope.username = username;
  }
}

  doSubmit()
    $scope.doSubmit = function() {
      conn.getRows($scope.doQuery, 'CALL cus_order("'+ i_date+ '", '+ username')')
    }


    $scope.doTableQuery = function() {
      conn.getRows(handleTableData, 'select foodName, price from menuItem where foodTruckName = "' + $scope.foodTruckName + '"');
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


  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

  $scope.backInfo = function() {
    window.location.href = 'CurrentInformation.html';
  }

  $scope.defineTruck()
  $scope.defineUsername()
  $scope.doTableQuery

});
