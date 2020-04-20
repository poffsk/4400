const fs = require("fs");
const errormsg = require("../js/controllers/errormsg.js");
myApp.controller("managefoodtruckCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";
  $scope.noStatMsgFlag = false;

  $scope.i_hasRemainingCapacity = false;

  //Drop down
  $scope.doQuery2 = function() {
    conn.getRows(handleData2, 'select stationName from station')
  }

  function handleData2(rows) {
    var myList2 = [];
    for (var stationInfo of rows) {
      myList2.push(stationInfo.stationName);
    }

    $scope.stationList = myList2;
    $scope.$apply($scope.stationList);

    //console.log(rows);
    $scope.mytest2 = rows;
    $scope.$apply($scope.mytest2);
  }

  //end drop down

  //"Excuse me, what's the manager's username"
  function defineManager() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    i_managerUsername = obj[0].username;
    $scope.i_managerUsername = i_managerUsername;
  }

  //now you know that manager's Name
  $scope.doProcedure = function() {
    var i_managerUsername;
    var i_foodTruckName;
    var i_stationName;
    var i_minStaffCount;
    var i_maxStaffCount;
    var i_hasRemainingCapacity;

    i_managerUsername = '"' + $scope.i_managerUsername + '"';

    if (typeof $scope.i_foodTruckName != "undefined" && $scope.i_foodTruckName.length > 0) {
      i_foodTruckName = '"' + $scope.i_foodTruckName + '"';
    } else {
      i_foodTruckName = 'null';
    }

    if (typeof $scope.i_stationName != "undefined" && $scope.i_stationName.length > 0) {
      i_stationName = '"' + $scope.i_stationName + '"';
    } else {
      i_stationName = 'null';
    }

    if (typeof $scope.i_minStaffCount != "undefined") {
      i_minStaffCount = '"' + $scope.i_minStaffCount + '"';
    } else {
      i_minStaffCount = 'null';
    }

    if (typeof $scope.i_maxStaffCount != "undefined") {
      i_maxStaffCount = '"' + $scope.i_maxStaffCount + '"';
    } else {
      i_maxStaffCount = 'null';
    }

    if (typeof $scope.i_hasRemainingCapacity != "undefined" && $scope.i_hasRemainingCapacity.length > 0) {
      i_hasRemainingCapacity = '"' + $scope.i_hasRemainingCapacity + '"';
    } else {
      i_hasRemainingCapacity = 'null';
    }

    conn.getRows($scope.doQuery3, 'CALL mn_filter_foodTruck(' + convNull($scope.i_managerUsername, true) + ', ' + convNull($scope.i_foodTruckName, true) + ', ' + convNull($scope.i_stationName, true) + ', ' + convNull($scope.i_minStaffCount, false) + ', ' + convNull($scope.i_maxStaffCount, false) + ', ' + $scope.i_hasRemainingCapacity + ')');
  }

  $scope.doQuery3 = function() {
    conn.getRows(handleTableData, 'select * from mn_filter_foodTruck_result');
  }



  function handleTableData(rows) {
    console.log(rows);
    var tableList = [];
    for (var tableRow of rows) {
      tableList.push(tableRow);
    }
    $scope.tableList = tableList;
    $scope.$apply($scope.tableList);
  }



  function convNull(valToCheck, addQuotes) {
    console.log(valToCheck);
    if (typeof valToCheck != "undefined" && valToCheck != null) {
      if (addQuotes) {
        return '"' + valToCheck + '"';
      } else {
        return valToCheck;
      }
    } else {
      return 'null';
    }
  }

  $scope.updateTruck = function() {
    if (typeof $scope.selectedRow != "undefined" && typeof $scope.tableList != "undefined" && typeof $scope.tableList[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableList[$scope.selectedRow]);
      var currRow = $scope.tableList[$scope.selectedRow];
      if (currRow.foodTruckName != null && currRow.foodTruckName.length > 0) {
        window.location.href = 'updatefoodtruck.html?foodTruckName=' + currRow.foodTruckName + '&stationName=' + currRow.stationName;
      } else {
        $scope.noStatMsgFlag = true;
            //// TODO: need to select a truck to update
      }
    }
    else {errormsg.showErrorMsg("error","Please select a truck to update");}
  }

  $scope.deleteTruck = function() {
    if (typeof $scope.selectedRow != "undefined" && typeof $scope.tableList != "undefined" && typeof $scope.tableList[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableList[$scope.selectedRow]);
      var currRow = $scope.tableList[$scope.selectedRow];
      if (currRow.foodTruckName != null && currRow.foodTruckName.length > 0) {
        conn.getRows($scope.doProcedure, 'call mn_delete_foodTruck("' + currRow.foodTruckName + '")');
      } else {
        $scope.noStatMsgFlag = true;
          //// TODO: need to select a truck to delete
      }
    }
    else {errormsg.showErrorMsg("error","Please select a truck to delete");}
  }


  $scope.goCreateTruck = function() {
    window.location.href = 'createfoodtruck.html';
  }

  $scope.goHome = function() {
    console.log('Help');
    window.location.href = 'Home.html';
  }

  $scope.doQuery2();
  defineManager();

});
