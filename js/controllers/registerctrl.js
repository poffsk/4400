myApp.controller("registerCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  const errormsg = require("../js/controllers/errormsg.js");

  function handleData(rows) {
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
    window.location.href = 'Login.html';
  }

  $scope.goLogin = function() {
    window.location.href = 'Login.html';
  }

  $scope.muchRegister = function() {
    errormsg.closeErrorMsg();
    if ($scope.i_username != "" && $scope.i_firstname != "" && $scope.i_lastname != "" && $scope.i_password != "" && $scope.i_password.length > 7 && ($scope.i_balance == "" || $scope.i_balance > 0)) {
      console.log('CALL register("' + $scope.i_username + '", ' + convNull($scope.i_email, true) + ', "' + $scope.i_firstname + '", "' + $scope.i_lastname + '", "' + $scope.i_password + '", ' + convNull($scope.i_balance, false) + ', "' + $scope.i_type + '")');
      conn.getRows(handleData, 'CALL register("' + $scope.i_username + '", ' + convNull($scope.i_email, true) + ', "' + $scope.i_firstname + '", "' + $scope.i_lastname + '", "' + $scope.i_password + '", ' + convNull($scope.i_balance, false) + ', ' + convNull($scope.i_type, true) + ')')
      //TODO: if not successful, don't go back to Login, show error
    } else {
      errormsg.showErrorMsg("error","Need more information");
    }
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



  $scope.getDisBitchSumData = function() {
    console.log($scope.i_buildingName);
  }

});
