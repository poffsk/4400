myApp.controller("summarydetailCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.goFTS = function() {
    console.log('Help');
    window.location.href = 'FoodTruckSummary.html';
  }

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

});
