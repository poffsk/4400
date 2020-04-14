myApp.controller("orderhistoryCtrl", function($scope) {
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

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

});
