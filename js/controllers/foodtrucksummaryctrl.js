const fs = require("fs");
myApp.controller("foodtrucksummaryCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function handleData(rows) {
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.goHome = function() {
    console.log('Help');
    window.location.href = 'Home.html';
  }

  $scope.defineManager = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if (obj.length > 0) {
      managerUsername = obj[0].username
      $scope.managerUsername = managerUsername;
    }
  }



  $scope.whichTruck = function() {
    var currRow = null;
    if (typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      currRow = $scope.tableResult[$scope.selectedRow];
      $scope.foodTruckName = currRow.foodTruckName
    }
  }

  $scope.goSummary = function() {
    if (typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      var currRow = $scope.tableResult[$scope.selectedRow];
      window.location.href = 'SummaryDetail.html?foodTruckName=' + currRow.foodTruckName;
    }
  }

  $scope.filterminDate = function(i_date) {
    if (i_date != null) {
      $scope.newminDate = i_date.toISOString().substring(0, 10);
      console.log($scope.newDate);
    } else {
      $scope.newminDate = null;
    }
  }

  $scope.filtermaxDate = function(i_date) {
    if (i_date != null) {
      $scope.newmaxDate = i_date.toISOString().substring(0, 10);
      console.log($scope.newDate);
    } else {
      $scope.newmaxDate = null;
    }
  }

  //how is this different from doCall... I guess doCall is only done when filter button
  $scope.doSort = function(i_sortedBy) {
    $scope.i_sortedBy = i_sortedBy;
    $scope.filterminDate($scope.i_minDate);
    $scope.filtermaxDate($scope.i_maxDate);
    conn.getRows($scope.doQuery, 'CALL mn_filter_summary(' + convNull($scope.managerUsername, true) +
      ', ' + convNull($scope.foodTruckName, true) //selected row has foodTruckName
      +
      ', ' + convNull($scope.i_stationName, true) //stationName from drop down
      +
      ', ' + convNull($scope.newminDate, true) +
      ', ' + convNull($scope.newmaxDate, true) +
      ', ' + convNull(i_sortedBy, true) //yeet
      +
      ', "ASC")');
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
  //how is this different from doSort
  $scope.doCall = function() {
    conn.getRows($scope.doQuery, 'CALL mn_filter_summary(' + convNull($scope.managerUsername, true) +
      ', ' + convNull($scope.foodTruckName, true) //selected row has foodTruckName
      +
      ', ' + convNull($scope.i_stationName, true) //stationName from drop down
      +
      ', ' + convNull($scope.i_minDate, true) +
      ', ' + convNull($scope.i_maxDate, true) +
      ', ' + convNull(i_sortedBy, true) //yeet
      +
      ', "ASC")');
  }

  $scope.doQuery = function() {
    var i_sortedBy_clean = convNull($scope.i_sortedBy, false);
    if (i_sortedBy_clean != 'null') {
      conn.getRows(handleData, 'select * from mn_filter_summary_result order by ' + i_sortedBy_clean);
    } else {
      conn.getRows(handleData, 'select * from mn_filter_summary_result');
    }
  }

  function handleData(rows) {
    /*var myList = [];
    for (var row of rows) {
      myList.push(rows);
    }*/

    $scope.tableResult = rows;
    $scope.$apply($scope.tableResult);
  }


  $scope.getDisBitchSumData = function() {
    console.log($scope.i_buildingName);
  }

  // Drop Down

  $scope.doDropCall = function() {
    conn.getRows($scope.doDropQuery, 'CALL mn_get_station(' + convNull($scope.managerUsername, true) + ')')
  }
  // where $scope.doQuery is the callback function


  $scope.doDropQuery = function() {
    conn.getRows(handleData2, 'select * from mn_get_station_result')
  }

  function handleData2(rows) {
    console.log(rows);
    var statList = [""];
    for (var statName of rows) {
      statList.push(statName);
    }

    $scope.statList = statList;
    $scope.$apply($scope.statList);

    //console.log(rows);
    $scope.mytest2 = rows;
    $scope.$apply($scope.mytest2);
  }

  //end drop down



  $scope.defineManager()
  $scope.doDropCall()

});
