myApp.controller("createStationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

  $scope.goScreen4cs = function(){
    window.location.href = 'ManageBldgStation.html';
  }

});
