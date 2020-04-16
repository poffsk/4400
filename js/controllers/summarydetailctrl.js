const fs = require("fs");
myApp.controller("summarydetailCtrl", function($scope) {
      const conn = require("../js/controllers/connection.js");
      $scope.mytest = "No data yet!";


      function defineFoodTruck() {
        console.log(window.location.href);
        var url = new URL(window.location.href);
        var search = new URLSearchParams(url.search);
        console.log(search.get("foodTruckName"));
        $scope.foodTruckName = search.get("foodTruckName");
      }


      $scope.defineManager = function() {
        test = fs.readFileSync('usersession.json');
        console.log(test.toString());
        var obj = JSON.parse(test);
        if (obj.length > 0) {
          managerUsername = obj[0].username
          $scope.managerUsername = managerUsername;
        }
      }

      $scope.doCall = function() {
        console.log('CALL mn_summary_detail("'+$scope.managerUsername + '", "' + $scope.foodTruckName + '")')
        conn.getRows($scope.doQuery, 'CALL mn_summary_detail("'+$scope.managerUsername + '", "' + $scope.foodTruckName + '")');
      }


      $scope.doQuery = function() {
        console.log('select * from mn_summary_detail_result')
        conn.getRows(handleData, 'select * from mn_summary_detail_result')
      }

      $scope.cleanDate = function(dateToClean){
        var dateFormat = require('dateformat');
        var day=dateFormat(dateToClean, "yyyy-mm-dd");
        return day;
      }

      function handleData(rows) {
        console.log(rows);
        var tableList = [];
        for (var tableRow of rows) {
          tableList.push(tableRow);
          $scope.tableList = tableList;
          $scope.$apply($scope.tableList);
        }
      }


        $scope.goFTS = function() {
          console.log('Help');
          window.location.href = 'FoodTruckSummary.html';
        }

        $scope.getDisBitchSumData = function() {
          console.log($scope.i_buildingName);
        }

        defineFoodTruck()
        $scope.defineManager()
        $scope.doCall()


      });
