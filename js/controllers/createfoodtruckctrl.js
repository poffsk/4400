myApp.controller("createFoodTruckCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  // Drop Down Data
    $scope.doDropdownQuery = function() {
      conn.getRows(handleDropData, 'select stationName from station where capacity > 0');
    }

    function handleDropData(rows) {
      var stationList = [];
      for (var statInfo of rows) {
        stationList.push(statInfo.stationName);
      }

      $scope.stationList = stationList;
      $scope.$apply($scope.stationList);

      console.log(rows);
      $scope.mytest = rows;
      $scope.$apply($scope.mytest);
    }
  //end drop down data

  $scope.goScreen11= function() {
    window.location.href = 'managefoodtruck.html';

  }


  $scope.BigCreate= function() {


  }

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

$scope.doDropdownQuery()
});
