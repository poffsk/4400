myApp.controller("createFoodCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  const errormsg = require("../js/controllers/errormsg.js");
  $scope.mytest = "No data yet!";

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.insertFood = function() {
    errormsg.closeErrorMsg();
    if(typeof $scope.i_foodName != "undefined" && $scope.i_foodName.length > 0){
    conn.getRows($scope.dummyFunction, 'CALL ad_create_food("' + $scope.i_foodName+ '")')
    //// TODO: error if food name already exists
    }
    else {errormsg.showErrorMsg("error","What food should we create?");}
}

  $scope.dummyFunction = function() {
    errormsg.showErrorMsg("success","Food Created!");
}

  $scope.goManageFood = function() {
    window.location.href = 'managefood.html'
  }

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

});
