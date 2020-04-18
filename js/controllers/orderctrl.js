const fs = require("fs");
myApp.controller("orderCtrl", function($scope) {
      const conn = require("../js/controllers/connection.js");
      $scope.mytest = "No data yet!";


      $scope.defineTruck = function() {
        console.log(window.location.href);
        var url = new URL(window.location.href);
        var search = new URLSearchParams(url.search);
        console.log(search.get("foodTruckName"));
        $scope.foodTruckName = search.get("foodTruckName");
        //$scope.foodTruckName = FoodTruckYoureLookingFor
      }

      $scope.defineUsername = function() {
        test = fs.readFileSync('usersession.json');
        console.log(test.toString());
        var obj = JSON.parse(test);
        if (obj.length > 0) {
          username = obj[0].username;
          $scope.username = username;
        }
      }

      $scope.doSubmit = function() {
        //for / if checkbox needed here, need to loop over var
        conn.getRows($scope.doQuery, 'CALL cus_order_add_item_to_order("' + i_date + '", "' + $scope.username + '")');
      }

      $scope.doQuery = function() {
        conn.getRows(handleTableData, 'select foodName, price from menuItem where foodTruckName = "' + $scope.foodTruckName + '"');
      }


      $scope.doTableQuery = function() {
        conn.getRows(handleTableData, 'select foodName, price from menuItem where foodTruckName = "' + $scope.foodTruckName + '"');
      }


      function handleTableData(rows) {
        console.log(rows);
        var tableList = [];
        for (var tableRow of rows) {
          tableRow.selected = false;
          tableRow.i_purchaseQuantity = 0;
          tableList.push(tableRow);
        }
        $scope.tableList = tableList;
        $scope.$apply();
      }


      $scope.getDisBitchSumData = function() {
        console.log($scope.i_buildingName);
      }

      $scope.filterDate = function(i_date) {
        $scope.newDate = $scope.i_date.toISOString().substring(0, 10);
        console.log($scope.newDate);
      }

      $scope.backInfo = function() {
        window.location.href = 'CurrentInformation.html';
      }

      $scope.goSubmit = function() {
        $scope.filterDate($scope.i_date);
        console.log('CALL cus_order("' + $scope.newDate + '", "' + $scope.username + '")')
        conn.getRows($scope.defineOrderID, 'CALL cus_order("' + $scope.newDate + '", "' + $scope.username + '")');
      } //first need to call
      //need help pulling the data from the table... somehow need the foodName and purchase quantity... and orderID

      $scope.defineOrderID = function() {
        console.log('CALL cus_order("' + $scope.newDate + '", "' + $scope.username + '")');
        conn.getRows(getOrderID, 'select max(orderID) as orderID from orders where customerUsername = "' + $scope.username + '"');
        }

        function getOrderID(rows) {
          console.log(rows);
          $scope.orderID = rows[0].orderID;
          $scope.$apply();
          $scope.doOrderCall();
        }

        $scope.doOrderCall = function() {
          console.log('do Order Call has been called');
          console.log($scope.tableList);
          console.log(typeof $scope.tableList[0].selected);
          for (foodItem of $scope.tableList) {
            console.log(foodItem.selected);
            if (foodItem.selected == true) {
              console.log('CALL cus_add_item_to_order("' + $scope.foodTruckName + '", "' + foodItem.foodName + '", "' + foodItem.i_purchaseQuantity + '", "' + $scope.orderID + '")')
              conn.getRows(handleOrderData, 'CALL cus_add_item_to_order("' + $scope.foodTruckName + '", "' + foodItem.foodName + '", "' + foodItem.i_purchaseQuantity + '", "' + $scope.orderID + '")');
            }
          }
        }

        // handleData
        function handleOrderData(rows) {
          console.log(rows);
        }


        $scope.defineTruck();
        $scope.defineUsername();
        $scope.doTableQuery();

      });
