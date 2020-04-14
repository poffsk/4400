const fs = require("fs");

myApp.controller("loginCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
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
    if (rows != null) {
      fs.writeFileSync('usersession.json', JSON.stringify(rows));

      window.location.href = 'Home.html';
    }
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.goRegister = function() {
    console.log('Help');
    window.location.href = 'Register.html';
  }

  // 'insert into login_result values('+$scope.i_username+', '+$scope.i_password+')') -->

});
