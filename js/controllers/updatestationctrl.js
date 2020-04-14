myApp.controller("updateStationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  $scope.doQuery = function() {
    conn.getRows(handleData, 'select buildingName from building where buildingName not in (select buildingName from station)')
  }

  function handleData(rows) {
    //console.log(rows);
    if(rows != null && rows.length > 0){
      $scope.statCapacity = rows[0].capacity;
      $scope.statBuilding = rows[0].buildingName;
      $scope.$apply($scope.buildDescr);
    }
  $scope.doQuery = function() {
  console.log('select buildingName from building')
  conn.getRows(handleData, 'select buildingName from building')
  }
  function handleData(rows) {
    //console.log(rows);
    if (rows != null && rows.length > 0) {
      $scope.statCapacity = rows[0].capacity;
      $scope.statBuilding = rows[0].buildingName;
      $scope.$apply($scope.statCapacity);
      $scope.$apply($scope.statBuilding);
    }
  }

  $scope.getDisBitchSumData = function() {
    console.log($scope.i_buildingName);
  }


  $scope.goScreen4 = function() {
    console.log('Help');
    window.location.href = 'ManageBldgStation.html';
  }

});
