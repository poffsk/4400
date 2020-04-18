const fs = require("fs");
myApp.controller("createFoodTruckCtrl", function($scope) {
      const conn = require("../js/controllers/connection.js");
      $scope.nullMsgFlag = false;
      $scope.mytest = "No data yet!";

      //TODO: EXAMPLE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      $scope.foodData = []
      //[{"foodName":"apples", "price":5.00}, {"foodName":"weefls","price":0.00}];
      $scope.usedFoodList = [];
      var createCount = 0;

      // Drop Down Data
      $scope.doDropdownQuery = function() {
        conn.getRows(handleDropData, 'select stationName from station where capacity > 0');
        //TO DO: need remaining capacity
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
        $scope.$apply();

        console.log(rows);
      }

      //multi-select of available employees
      $scope.doStaffQuery = function() {
        conn.getRows(handleStaffData, 'select concat(firstname, " ", lastname) as "fullName", username from user where username in (select username from staff where foodTruckName is null)');
      }

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

      function tableHasFoodItem(foodName) {
        var exists = false;

        for (var foodItem of $scope.foodData) {
          if (foodItem.foodName == foodName) {
            exists = true;
            break;
          }
        }

        return exists;
      }


      $scope.addFood = function() {
        if (!tableHasFoodItem($scope.i_foodName) && $scope.i_price >= 0) {
          var newFoodItem = {
            "foodName": $scope.i_foodName,
            "price": $scope.i_price
          };
          $scope.foodData.push(newFoodItem);
          $scope.usedFoodList.push($scope.i_foodName);
  //        $scope.i_foodName = "";
    //      $scope.i_price = "";
          console.log($scope.usedFoodList);
        }
      }

      $scope.removeFood = function(foodTableIndex) {
        // if the food name existed in the table, then remove
        if (foodTableIndex >= 0) {
          var removedFoodItem = $scope.foodData.splice(foodTableIndex, 1);
          var foodItemIndex = $scope.usedFoodList.indexOf(removedFoodItem.foodName);
          $scope.usedFoodList.splice(foodItemIndex, 1);
          console.log($scope.usedFoodList);
        }
      }


      //Big Create


      $scope.bigCreate = function() {
        console.log($scope.truckList)
        if (($scope.i_foodTruckName != null) && ((!$scope.truckList.includes($scope.i_foodTruckName)) && ($scope.i_stationName != null) && ($scope.selectedStaffArray.length > 0) && ($scope.usedFoodList.length > 0))){
            $scope.nullMsgFlag = false;
            conn.getRows($scope.doCall19b, 'CALL mn_create_foodTruck_add_station("' + $scope.i_foodTruckName + '", "' + $scope.i_stationName + '", "' + $scope.managerUsername + '")')
          } else {
            $scope.nullMsgFlag = true;
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

        $scope.doCall19b = function() {
          var staffUsername = "";
          for (var staff of $scope.selectedStaffArray) { //need to convert
            staffUsername = filterStaff(staff);
            conn.getRows($scope.doCall19c, 'CALL mn_create_foodTruck_add_staff("' + $scope.i_foodTruckName + '", "' + staffUsername + '")');
          }
        }

        $scope.doCall19c = function() {
          console.log($scope.usedFoodList);
          createCount = $scope.foodData.length;
          for (var food of $scope.foodData) {
            conn.getRows($scope.handleData, 'CALL mn_create_foodTruck_add_menu_item("' + $scope.i_foodTruckName + '", "' + food.price + '", "' + food.foodName + '")')
            //again, what happens when we try to insert multiple rows
          }
        }

        $scope.handleData = function(rows) {
          console.log(rows);
          $scope.mytest = rows;
          $scope.$apply($scope.mytest);
          createCount--;
          if (createCount <= 0){
            window.location.href = 'managefoodtruck.html';
          }
        }

        //end big create
        $scope.goScreen11 = function() {
          window.location.href = 'managefoodtruck.html';

        }

        $scope.doDropdownQuery();
        $scope.doDropdownQuery2();
        $scope.doStaffQuery();
        $scope.defineManager();
        $scope.doTruckQuery();
      });
