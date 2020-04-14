myApp.controller("myAppCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.doQuery = function(){
    conn.getRows(handleData, 'SELECT `id`,`name` FROM `articles` LIMIT 10');

  }

});
