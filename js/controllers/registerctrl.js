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
    console.log('CALL register("' + $scope.i_username + '", ' + convNull($scope.i_email, true) + ', "' + $scope.i_firstname + '", "' + $scope.i_lastname + '", "' + $scope.i_password + '", ' + convNull($scope.i_balance, false) + ', "' + $scope.i_type + '")');
    conn.getRows(handleData, 'CALL register("' + $scope.i_username + '", ' + convNull($scope.i_email, true) + ', "' + $scope.i_firstname + '", "' + $scope.i_lastname + '", "' + $scope.i_password + '", ' + convNull($scope.i_balance, false) + ', ' + convNull($scope.i_type, true) + ')')
    window.location.href = 'Login.html';
  }

  function convNull(valToCheck, addQuotes) {
    if (typeof valToCheck != "undefined" && valToCheck != null) {
      if (addQuotes) {
        return '"' + valToCheck + '"';
      } else {
        return valToCheck;
      }
    } else {
      return null;
    }
  }



  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

});
