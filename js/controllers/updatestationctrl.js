myApp.controller("updateStationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function defineStation() {
    console.log(window.location.href);
    var url = new URL(window.location.href);
    var search = new URLSearchParams(url.search);
    console.log(search.get("stationName"));
    $scope.stationName = search.get("stationName");
  }

// Drop Down Data
  $scope.doDropdownQuery = function() {
    conn.getRows(handleDropData, 'select buildingName from building where buildingName not in (select buildingName from station)')
  }

  function handleDropData(rows) {
    var buildList = [];
    for (var buildingInfo of rows) {
      buildList.push(buildingInfo.buildingName);
    }

    $scope.buildList = buildList;
    $scope.$apply($scope.buildList);

    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }
//end drop down data

$scope.updateStation = function() {
  conn.getRows($scope.doQuery, 'CALL ad_update_station("' + $scope.stationName + '", "'+$scope.statCapacity +'", "'+$scope.statBuilding + '")')
}



  $scope.doCall = function() {
    conn.getRows($scope.doQuery, 'CALL ad_view_station("' + $scope.stationName + '")')
  }

  $scope.doQuery = function() {
    conn.getRows(handleData, 'select * from ad_view_station_result')
  }


  function handleData(rows) {
    if(rows != null && rows.length > 0){
      $scope.statCapacity = rows[0].capacity;
      $scope.statBuilding = rows[0].buildingName;
      $scope.$apply($scope.statCapacity);
      $scope.$apply($scope.statBuilding);
      $scope.doDropdownQuery()
    }
  }


  $scope.getDisBitchSumData = function() {
    console.log($scope.i_buildingName);
  }


  $scope.goScreen4 = function() {
    console.log('Help');
    window.location.href = 'ManageBldgStation.html';
  }

  defineStation();
  $scope.doDropdownQuery();
  $scope.doCall();

});
