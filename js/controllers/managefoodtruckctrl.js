const fs = require("fs");
myApp.controller("managefoodtruckCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

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

  if (typeof $scope.i_minStaffCount != "undefined" && $scope.i_minStaffCount.length > 0) {
    i_minStaffCount = '"' + $scope.i_minStaffCount + '"';
  } else {
    i_minStaffCount = 'null';
  }

  if (typeof $scope.i_maxStaffCount != "undefined" && $scope.i_maxStaffCount.length > 0) {
    i_maxStaffCount = '"' + $scope.i_maxStaffCount + '"';
  } else {
    i_maxStaffCount = 'null';
  }

  if (typeof $scope.i_hasRemainingCapacity != "undefined" && $scope.i_hasRemainingCapacity.length > 0) {
    i_hasRemainingCapacity = '"' + $scope.i_hasRemainingCapacity + '"';
  } else {
    i_hasRemainingCapacity = 'null';
  }

  conn.getRows($scope.doQuery3, 'CALL mn_filter_foodTruck(' + i_managerUsername + ', ' + i_foodTruckName + ', ' + i_stationName + ', ' + i_minStaffCount + ', ' + i_maxStaffCount + ', ' + i_hasRemainingCapacity + ')');
}

$scope.doQuery3 = function() {
  conn.getRows(handleTableData, 'select * from mn_filter_foodTruck_result');
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

  $scope.goHome = function() {
    console.log('Help');
    window.location.href = 'Home.html';
  }

  $scope.doQuery2();
  defineManager()
});
