myApp.controller("registerCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.goLogin = function() {
    window.location.href = 'Login.html';
  }

  $scope.muchRegister = function() {
    console.log('CALL register("' + $scope.i_username + '", "' + $scope.i_email + '", "' + $scope.i_firstname + '", "' + $scope.i_lastname + '", "' + $scope.i_password + '", "' + $scope.i_balance + '", "' + $scope.i_type + '")');
    conn.getRows(handleData, 'CALL register("' + $scope.i_username + '", "' + $scope.i_email + '", "' + $scope.i_firstname + '", "' + $scope.i_lastname + '", "' + $scope.i_password + '", "' + $scope.i_balance + '", "' + $scope.i_type + '")')
    window.location.href = 'Login.html';
  }


  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

});
