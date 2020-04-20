myApp.controller("createStationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  const errormsg = require("../js/controllers/errormsg.js");
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
    if (typeof $scope.stationName != "undefined" && typeof $scope.statBuilding != "undefined" && typeof $scope.i_Capacity != "undefined") {
      conn.getRows($scope.doQuery, 'CALL ad_create_station("' + $scope.stationName + '", "' + $scope.statBuilding + '", ' + $scope.i_Capacity + ')')
      //// TODO: need to fill all fields and enter unique station
    } else {
      errormsg.showErrorMsg("error", "Need more information");
    }
  }

  $scope.doQuery = function() {
    errormsg.showErrorMsg("success", "Station has been created");
  }

  function handleNullData(rows) {}

  /* function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  } */


  $scope.goScreen4cs = function() {
    window.location.href = 'ManageBldgStation.html';
  }

  $scope.doDropdownQuery();

});
