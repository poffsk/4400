myApp.controller("createStationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";


  // Drop Down Data
    $scope.doDropdownQuery = function() {
      conn.getRows($scope.doDropdownQueryAfter, 'call ad_get_available_building');
      //  'select buildingName from building where buildingName not in (select buildingName from station)')
    }

    $scope.doDropdownQueryAfter = function() {
      conn.getRows(handleDropData, 'select * from ad_get_available_building_result');
      //  'select buildingName from building where buildingName not in (select buildingName from station)')
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



  $scope.createStation = function() {
    conn.getRows($scope.doQuery, 'CALL ad_create_station("' + $scope.stationName + '", "'+$scope.statBuilding +'", "'+$scope.i_Capacity + '")')
  }

  $scope.doQuery = function() {
    conn.getRows(handleNullData, 'select * from ad_view_station_result')
  }

  function handleNullData(rows){
  }

  /* function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  } */

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

  $scope.goScreen4cs = function(){
    window.location.href = 'ManageBldgStation.html';
  }

  $scope.doDropdownQuery();

});
