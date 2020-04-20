//const session=require("js/controllers/getsessioninfo");
const fs=require("fs");
myApp.controller("exploreCtrl", function($scope) {
  const errormsg = require("../js/controllers/errormsg.js");
  //console.log(session.getInfo());
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";


  $scope.goHome = function() {
    console.log('Help');
    window.location.href = 'Home.html';
  }

  // Drop Down Data

  $scope.doDropdownQuery = function() {
    conn.getRows(handleDropData, 'select buildingName from building')
  }

  function handleDropData(rows) {
    var buildList = [];
    for (var buildingInfo of rows) {
      buildList.push(buildingInfo.buildingName);
    }

    $scope.buildingList = buildList;
    $scope.$apply($scope.buildingList);

    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  // second drop down
  $scope.doDropdownQuery2 = function() {
    conn.getRows(handleDropData2, 'select stationName from station')
  }

  function handleDropData2(rows) {
    var statList = [];
    for (var stationInfo of rows) {
      statList.push(stationInfo.stationName);
    }

    $scope.stationList = statList;
    $scope.$apply($scope.stationList);

    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }
  //end drop down data

  $scope.doProcedure = function() {
    var buildingName;
    var stationName;
    var buildingTag;
    var foodTruckName;
    var foodName;

    if (typeof $scope.i_buildingName != "undefined" && $scope.i_buildingName.length > 0) {
      buildingName = '"' + $scope.i_buildingName + '"';
    } else {
      buildingName = 'null';
    }

    if (typeof $scope.i_stationName != "undefined" && $scope.i_stationName.length > 0) {
      stationName = '"' + $scope.i_stationName + '"';
    } else {
      stationName = 'null';
    }

    if (typeof $scope.i_buildingTag != "undefined" && $scope.i_buildingTag.length > 0) {
      buildingTag = '"' + $scope.i_buildingTag + '"';
    } else {
      buildingTag = 'null';
    }


    if (typeof $scope.i_foodTruckName != "undefined" && $scope.i_foodTruckName.length > 0) {
      foodTruckName = '"' + $scope.i_foodTruckName + '"';
    } else {
      foodTruckName = 'null';
    }

    if (typeof $scope.i_foodName != "undefined" && $scope.i_foodName.length > 0) {
      foodName = '"' + $scope.i_foodName + '"';
    } else {
      foodName = 'null';
    }

    conn.getRows($scope.doQuery3, 'CALL cus_filter_explore(' + buildingName + ', ' + stationName + ', ' + buildingTag + ', ' + foodTruckName + ', ' + foodName + ')');
  }

  $scope.doQuery3 = function() {
    conn.getRows(handleTableData, 'select * from cus_filter_explore_result');
  }



  $scope.setLocation = function() {
    errormsg.closeErrorMsg();
    if ($scope.tableResult != "undefined" && typeof $scope.selectedRow != "undefined" && typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableResult[$scope.selectedRow]);
      var currRow = $scope.tableResult[$scope.selectedRow];
      console.log(currRow.stationName);
      if (currRow.stationName != null && currRow.stationName.length > 0) {
        test = fs.readFileSync('usersession.json');
        console.log(test.toString());
        var obj = JSON.parse(test);
        if(obj.length > 0){
          username = obj[0].username
        }
          conn.getRows(handleDataNull, 'call cus_select_location("' + username + '", "' + currRow.stationName + '")');
      }
    }
    else {errormsg.showErrorMsg("error","Need to select a location")}
  }

  function handleDataNull(rows) {
    console.log('sure, we handled that table!');
  }


  function handleTableData(rows) {
    console.log('we handled that table!');
    console.log(rows);
    $scope.tableResult = rows;
    $scope.$apply($scope.tableResult);
  }


  $scope.getDisBitchSumData = function() {
    console.log($scope.i_buildingName);
  }

  $scope.doDropdownQuery()
  $scope.doDropdownQuery2()

});
