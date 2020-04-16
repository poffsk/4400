const fs = require("fs");
myApp.controller("updatefoodtruckCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  // Drop Down Data
  $scope.doDropdownQuery = function() {
    conn.getRows(handleDropData, 'select stationName from station where capacity > 0');
  }

  function handleDropData(rows) {
    var stationList = [];
    for (var statInfo of rows) {
      stationList.push(statInfo.stationName);
    }

    $scope.stationList = stationList;
    $scope.$apply($scope.stationList);

    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  // second drop down
  $scope.doDropdownQuery2 = function() {
    conn.getRows(handleDropData2, 'select foodName from food')
    /* to do: remove previously used data from drop down list */
  }

  function handleDropData2(rows) {
    var foodList = [];
    for (var foodInfo of rows) {
      foodList.push(foodInfo);
    }

    $scope.foodList = foodList;
    $scope.$apply($scope.foodList);

    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  //multi-select of available employees

  $scope.doStaffCall = function() {
    console.log('call mn_view_foodTruck_available_staff("'+$scope.managerUsername + '", "' + $scope.foodTruckName + '")')
    conn.getRows($scope.doStaffQuery, 'call mn_view_foodTruck_available_staff("'+$scope.managerUsername + '", "' + $scope.foodTruckName + '")');
  }
  $scope.doStaffQuery = function() {
    conn.getRows(handleStaffData, 'select * from mn_view_foodTruck_available_staff_result');
  }


// doCall()
  $scope.doFoodQuery = function() {
    conn.getRows(handleFoodData, 'CALL mn_update_foodTruck_menu_item('+convNull($scope.foodTruckName,true) + ',' + convNull($scope.i_price, true) + ', ' +convNull($scope.i_foodName,true) +')')
  }
// where $scope.doQuery is the callback function
//stopped here


handleData
  function handleFoodData(rows) {
    console.log(rows);
    var myList = [];
    for (var foodNames of rows) {
      myList.push(foodNames.foodName);
	    $scope.foodData = myList;
    	$scope.$apply($scope.foodData);
    }

    function tableHasFoodItem(foodName) {
      var exists = false;
      for (var foodItem of $scope.foodData) {
        if (foodItem.foodName == foodName) {
          exists = true;
          break;}
      } return exists;
    }

    $scope.addFood = function() {
      if (!tableHasFoodItem($scope.i_foodName)) {
        var newFoodItem = {
          "foodName": $scope.i_foodName,
          "price": $scope.i_price
        };
        $scope.foodData.push(newFoodItem);
        $scope.usedFoodList.push($scope.i_foodName);
        $scope.i_foodName = "";
        $scope.i_price = "";
        console.log($scope.usedFoodList);
      }
    }


    // Staff


  function handleStaffData(rows) {
    var empList = [];
    for (var empInfo of rows) {
      empList.push(empInfo);
    }

    $scope.empList = empList;
    $scope.$apply($scope.empList);

    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.doTruckQuery = function() {
    conn.getRows(handleTruckData, 'select foodTruckName from foodtruck');
  }

  function handleTruckData(rows) {
    var truckList = [];
    for (var truckInfo of rows) {
      truckList.push(truckInfo.foodTruckName);
    }

    $scope.truckList = truckList;
    $scope.$apply($scope.truckList);

    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }


  //end drop down data

  $scope.defineManager = function() {
    test = fs.readFileSync('usersession.json');
    console.log(test.toString());
    var obj = JSON.parse(test);
    if (obj.length > 0) {
      managerUsername = obj[0].username
      $scope.managerUsername = managerUsername;
    }
  }




  function filterStaff(staffFullName) {
    var username = "";
    for (var emp of $scope.empList) {
      if (emp.fullName == staffFullName) {
        username = emp.username;
        break;
      }
    }
    return username;
  }




  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

  $scope.doDropdownQuery();
  $scope.doDropdownQuery2();
  $scope.doStaffCall();
  $scope.defineManager();
  //$scope.doTruckQuery();

});
