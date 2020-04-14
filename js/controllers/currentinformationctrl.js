myApp.controller("currentinformationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.goHome = function() {
    console.log('Help');
    window.location.href = 'Home.html';
  }

  $scope.goOrder = function() {
    console.log('Help');
    window.location.href = 'order.html';
  }

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

});
