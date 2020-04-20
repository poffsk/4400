const fs = require("fs");

myApp.controller("loginCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  const errormsg = require("../js/controllers/errormsg.js");
  $scope.mytest = "No data yet!";


  $scope.doCall = function() {
    console.log('CALL login("' + $scope.i_username + '", "' + $scope.i_password + '")');
    conn.getRows($scope.doQuery, 'CALL login("' + $scope.i_username + '", "' + $scope.i_password + '")')
  }
  $scope.doQuery = function() {
    console.log('select * from login_result')
    conn.getRows(handleData, 'select * from login_result')
  }

  function handleData(rows) {
    //console.log(rows);
    if (rows.length > 0) {
      fs.writeFileSync('usersession.json', JSON.stringify(rows));
      window.location.href = 'Home.html';
    }
    else {errormsg.showErrorMsg("error","No user found in database")}
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.goRegister = function() {
    console.log('Help');
    window.location.href = 'Register.html';
  }

  // 'insert into login_result values('+$scope.i_username+', '+$scope.i_password+')') -->

});
