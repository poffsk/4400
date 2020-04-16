myApp.controller("manageFoodCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";


  $scope.getDisBitchSumData = function() {
    console.log($scope.i_buildingName);
  }

  //Drop down
  $scope.doQuery2 = function() {
    conn.getRows(handleData2, 'select foodName from food')
  }


  $scope.goHome = function() {
    window.location.href = 'Home.html';
  }

  function convNull(valToCheck, addQuotes){
    if(typeof valToCheck != "undefined" && valToCheck != null && valToCheck.length > 0){
      if(addQuotes){
        return '"' + valToCheck + '"';
      }
      else{
        return valToCheck;
      }
    }
    else{
      return 'null';
    }
  }

  $scope.doCall = function() {
    conn.getRows($scope.doQuery, 'CALL ad_filter_food('+convNull($scope.i_foodName,true) + ',' + convNull($scope.i_sortedBy, true) + ', "ASC")')
  }

  $scope.doQuery = function() {
    var i_sortedBy_clean = convNull($scope.i_sortedBy,false);
    if(i_sortedBy_clean != 'null'){
      conn.getRows(handleData, 'select * from ad_filter_food_result order by ' + i_sortedBy_clean);
    }
    else{
      conn.getRows(handleData, 'select * from ad_filter_food_result');
    }
  }

  $scope.doSort = function(i_sortedBy) {
    $scope.i_sortedBy = i_sortedBy;
    conn.getRows($scope.doQuery, 'CALL ad_filter_food('+convNull($scope.i_foodName, true) + ',' + convNull(i_sortedBy,true) + ', "ASC")');
  }

  function handleData(rows) {
    /*var myList = [];
    for (var row of rows) {
      myList.push(rows);
    }*/

    $scope.tableResult = rows;
    $scope.$apply($scope.tableResult);
  }

  function handleData2(rows) {
    console.log(rows);
    var myList = [];
    for (var foodNames of rows) {
      myList.push(foodNames.foodName);
    }

    $scope.foodList = myList;
    $scope.$apply($scope.foodList);

    //console.log(rows);
    $scope.mytest2 = rows;
    $scope.$apply($scope.mytest2);
  }

  //end drop down


  $scope.goCreateFood = function() {
    window.location.href = 'createfood.html'
  }

  $scope.deleteFood = function() {
    if (typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableResult[$scope.selectedRow]);
      var currRow = $scope.tableResult[$scope.selectedRow];
      conn.getRows($scope.doQuery2(),'call ad_delete_food("' + currRow.foodName + '")')
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

  $scope.doQuery2()
  $scope.doCall()

});
