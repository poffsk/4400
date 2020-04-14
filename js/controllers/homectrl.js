const fs = require("fs");
myApp.controller("homeCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  $scope.goExplore = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if(obj.length > 0){
      if (obj[0].userType == "Customer" || obj[0].userType == "Manager-Customer" || obj[0].userType == "Staff-Customer" || obj[0].userType == "Admin-Customer") {
        window.location.href = 'Explore.html';
      }
    }
  }

  $scope.goViewOrder = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if(obj.length > 0){
      if (obj[0].userType == "Customer" || obj[0].userType == "Manager-Customer" || obj[0].userType == "Staff-Customer" || obj[0].userType == "Admin-Customer") {
        window.location.href = 'OrderHistory.html';
      }
    }
  }

  $scope.goViewInfo = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if(obj.length > 0){
      if (obj[0].userType == "Customer" || obj[0].userType == "Manager-Customer" || obj[0].userType == "Staff-Customer" || obj[0].userType == "Admin-Customer") {
        window.location.href = 'CurrentInformation.html';
      }
    }
  }

  $scope.goManageTrucks = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if(obj.length > 0){
      if (obj[0].userType == "Manager" || obj[0].userType == "Manager-Customer") {
        window.location.href = 'ManageFoodTruck.html';
      }
    }
  }

  $scope.goViewTrucks = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if(obj.length > 0){
      if (obj[0].userType == "Manager" || obj[0].userType == "Manager-Customer") {
        window.location.href = 'FoodTruckSummary.html';
      }
    }
  }

  $scope.goManageBldgStat = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if(obj.length > 0){
      if (obj[0].userType == "Admin" || obj[0].userType == "Admin-Customer") {
        window.location.href = 'ManageBldgStation.html';
      }
    }
  }

  $scope.goManageFood = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if(obj.length > 0){
      if (obj[0].userType == "Admin" || obj[0].userType == "Admin-Customer") {
        window.location.href = 'ManageFood.html';
      }
    }
  }

});
