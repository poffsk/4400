myApp.controller("createFoodCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.insertFood = function() {
    if(typeof $scope.i_foodName != "undefined" && $scope.i_foodName.length > 0){
    conn.getRows($scope.dummyFunction, 'CALL ad_create_food("' + $scope.i_foodName+ '")')
  }
}

  $scope.dummyFunction = function() {
}

  $scope.goManageFood = function() {
    window.location.href = 'managefood.html'
  }

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

});
