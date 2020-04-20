myApp.controller("updateStationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  const errormsg = require("../js/controllers/errormsg.js");
  $scope.mytest = "No data yet!";
  var buildList = [];

  function defineStation() {
    console.log(window.location.href);
    var url = new URL(window.location.href);
    var search = new URLSearchParams(url.search);
    console.log(search.get("stationName"));
    $scope.stationName = search.get("stationName");
  }

  // Drop Down Data
  $scope.doDropdownQuery = function() {
    conn.getRows(handleDropData, 'select buildingName from building where buildingName not in (select buildingName from station)', "doDropdownQuery");
  }

  $scope.doDrop2Call = function() {
    conn.getRows($scope.doDropdownQuery2, 'call ad_view_station ("' + $scope.stationName + '")', "doDrop2Call");

  }

  $scope.doDropdownQuery2 = function() {
    conn.getRows(handleImportantDropData, 'select capacity, buildingName from ad_view_station_result where stationname = "' + $scope.stationName + '"', "doDropdownQuery2");
    //  conn.getRows(handleDropData, 'select buildingName from building where buildingName = (select buildingName from station where stationname = "' + $scope.stationName + '")')
  }


  function handleDropData(rows) {
    var buildList = [];
    for (var buildingInfo of rows) {
      if (buildList.indexOf(buildingInfo.buildingName) < 0) {
        buildList.push(buildingInfo.buildingName);
      }
    }

    $scope.buildList = buildList;
    console.log(rows);
    $scope.$apply();
  }


  function handleImportantDropData(rows) {
    if ($scope.buildList.indexOf(rows[0].buildingName) < 0) {
      $scope.buildList.push(rows[0].buildingName);
    }
    $scope.statBuilding = rows[0].buildingName;
    $scope.statCapacity = rows[0].capacity;
    console.log(rows);
    $scope.$apply();
  }
  //end drop down data

  $scope.updateStation = function() {
    //// TODO: need to have a capacity
    errormsg.closeErrorMsg();
    if (typeof $scope.statCapacity != "undefined" && $scope.statCapacity > 0) {
      conn.getRows($scope.doCall, 'CALL ad_update_station("' + $scope.stationName + '", ' + convNull($scope.statCapacity, true) + ', "' + $scope.statBuilding + '")', "updateStation")
    } else {
      errormsg.showErrorMsg("error", "Need valid capacity");
    }
  }



  $scope.doCall = function() {
    conn.getRows($scope.doQuery, 'CALL ad_view_station("' + $scope.stationName + '")', "doCall");
  }

  $scope.doQuery = function() {
    conn.getRows(handleData, 'select * from ad_view_station_result', "doQuery");
  }


  function handleData(rows) {
    if (rows != null && rows.length > 0) {
      //    $scope.statCapacity = rows[0].capacity;
      //  $scope.statBuilding = rows[0].buildingName;
      $scope.$apply();
      $scope.doDropdownQuery();
      $scope.doDropdownQuery2();
    }
  }

  function convNull(valToCheck, addQuotes) {
    if (typeof valToCheck != "undefined" && valToCheck != null && valToCheck.length > 0) {
      if (addQuotes) {
        return '"' + valToCheck + '"';
      } else {
        return valToCheck;
      }
    } else {
      return 'null';
    }
  }



  $scope.goScreen4 = function() {
    console.log('Help');
    window.location.href = 'ManageBldgStation.html';
  }

  defineStation();
  $scope.doDropdownQuery();
  $scope.doDrop2Call();
  $scope.doCall();

});
