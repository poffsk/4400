const fs = require("fs");
myApp.controller("updatefoodtruckCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";
  $scope.nullMsgFlag = false;


  // Drop Down Data
  $scope.doDropdownQuery = function() {
    conn.getRows(handleDropData, 'select station.stationName, (station.capacity - count(foodtruck.foodtruckname)) as "remaining capacity" from station left join foodtruck on station.stationName = foodtruck.stationName group by station.stationName;');
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
  //  $scope.empList.push(empInfo);
  //  $scope.selectedStaffArray.push(empInfo.fullName);

  //  $scope.updateStaffCall(selectedStaffArray) for (var empInfo of rows) {
  //    $scope.empList.push(empInfo);
  //    $scope.selectedStaffArray.push(empInfo.fullName);
  //  }




  function tableHasFoodItem(foodName) {
    var exists = false;
    for (var foodItem of $scope.menuList) {
      if (foodItem.foodName == foodName) {
        exists = true;
        break;
      }
    }
    return exists;
  }

  $scope.addFood = function() {
    if (!tableHasFoodItem($scope.i_foodName)) {
      var newFoodItem = {
        "foodName": $scope.i_foodName,
        "price": $scope.i_price
      };
      $scope.foodList.push(newFoodItem);
      $scope.usedFoodList.push($scope.i_foodName);
      console.log($scope.usedFoodList);
      $scope.doCall22c();
    }
    $scope.doMenuCall();
  }

  $scope.goManageFT = function() {
    window.location.href = 'managefoodtruck.html'
  }

  // Trucks


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
    console.log($scope.fullUserList);
    for (var user of $scope.fullUserList) {
      if (user.fullName == staffFullName) {
        username = user.username;
        break;
      }
    }
    return username;
  }

  function defineTruckStation() {
    console.log(window.location.href);
    var url = new URL(window.location.href);
    var search = new URLSearchParams(url.search);
    console.log(search.get("foodTruckName"));
    $scope.foodTruckName = search.get("foodTruckName");
    $scope.foodTruckNameOld = search.get("foodTruckName");
    console.log(search.get("stationName"));
    $scope.i_stationName = search.get("stationName");
  }

  function convNull(valToCheck, addQuotes) {
    console.log(valToCheck);
    if (typeof valToCheck != "undefined" && valToCheck != null) {
      //&& valToCheck.length > 0
      if (addQuotes) {
        return '"' + valToCheck + '"';
      } else {
        return valToCheck;
      }
    } else {
      return 'null';
    }
  }


  // menuItems

  // doCall()

  // where $scope.doQuery is the callback function
  //stopped here





  $scope.doMenuCall = function() {
    conn.getRows($scope.doMenuQuery, 'CALL mn_view_foodTruck_menu(' + convNull($scope.foodTruckName, true) + ')')
  }
  // where $scope.doQuery is the callback function

  $scope.doMenuQuery = function() {
    conn.getRows(handleMenuData, 'select * from mn_view_foodTruck_menu_result')
  }


  function handleMenuData(rows) {
    console.log(rows);
    var menuList = [];
    var usedFoodList = [];
    for (var menuItems of rows) {
      menuList.push(menuItems);
      usedFoodList.push(menuItems.foodName);
    }
    $scope.menuList = menuList;
    $scope.usedFoodList = usedFoodList;
    $scope.$apply();
    console.log($scope.usedFoodList);
  }


  // end menuItems

  // staff
  $scope.doStaffCall = function() {
    console.log('call mn_view_foodTruck_available_staff()');
    conn.getRows($scope.doStaffQuery, 'call mn_view_foodTruck_available_staff()');
  }
  $scope.doStaffQuery = function() {
    conn.getRows(handleStaffData, 'select * from mn_view_foodTruck_available_staff_result');
  }

  $scope.doStaffCall2 = function() {
    console.log('call mn_view_foodTruck_staff()');
    conn.getRows($scope.doStaffQuery2, 'call mn_view_foodTruck_staff("' + $scope.foodTruckName + '")');
  }
  $scope.doStaffQuery2 = function() {
    conn.getRows(handleStaffData2, 'select * from mn_view_foodTruck_staff_result');
  }

  function handleStaffData(rows) {
    var empList = [];
    for (var empInfo of rows) {
      empList.push(empInfo);
    }

    $scope.empList = empList;
    $scope.$apply($scope.empList);
    $scope.doStaffCall2();
  }


  function handleStaffData2(rows) {
    $scope.selectedStaffArray = [];
    for (var empInfo of rows) {
      $scope.empList.push(empInfo);
      $scope.selectedStaffArray.push(empInfo.fullName);
    }
    $scope.$apply();
    console.log($scope.selectedStaffArray)
  }


  $scope.makefullUser = function() {
    conn.getRows(handleFullUserData, 'select concat(firstname, " ", lastname) as "fullName", username from user where username in (select username from staff where (foodTruckName = "' + $scope.foodTruckName + '") or (foodTruckName is null))');
  }


  function handleFullUserData(rows) {
    console.log(rows);
    var fullUserList = [];
    for (var fullData of rows) {
      fullUserList.push(fullData);
      $scope.fullUserList = fullUserList;
    }
    console.log($scope.fullUserList);
    $scope.$apply();
    defineSelectedUsername();
  }


  function defineSelectedUsername() {
    var selectedUsernameList = [];
    console.log($scope.fullUserList);
    for (nameyname of $scope.fullUserList) {
      if ($scope.selectedStaffArray.indexOf(nameyname.fullName) > 0) {
        selectedUsernameList.push(nameyname.username);
      }
    }
    $scope.selectedUsernameList = selectedUsernameList;
  }

  function sqlfyList(jsonArray, selectedProp) {
    console.log(jsonArray);
    var finalStr = "";

    for (itemIndex in jsonArray) {
      if (itemIndex < jsonArray.length - 1) {
        finalStr += '"' + jsonArray[itemIndex][selectedProp] + '",';
      } else if (itemIndex = jsonArray.length - 1) {
        finalStr += '"' + jsonArray[itemIndex][selectedProp] + '"';
      }
    }
    console.log(finalStr);
    return finalStr;
  }

  // it's finally time to use the Update button!

  $scope.clearStaffCall = function() {
    // $scope.fullUserList
    //  for (var staff of empList.fullName) {
    //    staffUsername = filterStaff(staff);
    //[object Object],[object Object],[object Object],[object Object],[object Object] for fullUserList
    conn.getRows($scope.doCall22a, 'update staff set staff.foodTruckName = null where staff.username in (' + sqlfyList($scope.fullUserList, "username") + ')');
  }

  $scope.doCall22a = function() { //need help here
    conn.getRows(convert2UN, 'CALL mn_update_foodTruck_station("' + $scope.foodTruckName + '", "' + $scope.i_stationName + '")')
    //should not update station location if there is not capacity, then will call 22b
  }

  $scope.doCall22b = function(rows) {
    // for (var fullestname of $scope.selectedStaffArray) {
    username = rows[0].username;
    conn.getRows($scope.handleFinalData, 'CALL mn_update_foodTruck_staff("' + $scope.foodTruckName + '", "' + username + '")')
    //need to fix selectedUsernameList
    //  }
  }


  $scope.doCall22c = function() {
    conn.getRows($scope.handleFinalData, 'CALL mn_update_foodTruck_menu_item("' + $scope.foodTruckName + '", ' + convNull($scope.i_price, true) + ', ' + convNull($scope.i_foodName, true) + ')')
    //this will fail for items that already exist... is that okay to let it silently suffer? Will it cancel the full call?
  }

  function convert2UN() {
    for (var fullestname of $scope.selectedStaffArray) {
      var firstName = fullestname.split(' ')[0];
      var lastName = fullestname.split(' ')[1];
      conn.getRows($scope.doCall22b, 'select username from user where firstName = "' + firstName + '"and lastName = "' + lastName + '"')
    }
  }


  // handleData
  function handleData(rows) {
    console.log(rows);
    var myList = [];
    for (var foodNames of rows) {
      myList.push(foodNames.foodName);
      $scope.mytest = rows;
      $scope.$apply($scope.mytest);
    }
  }



  function handleFinalData(rows) {
    $scope.i_price = "";
    $scope.i_foodname = "";
    $scope.$apply();

  }


  $scope.selectedStaffArray = [];
  $scope.fullUserList = [];
  $scope.menuList = [];
  $scope.doDropdownQuery();
  $scope.doDropdownQuery2();
  defineTruckStation();
  $scope.doMenuCall(); //prodecure 21 mn_view_foodTruck_menu
  $scope.doStaffCall();
  $scope.defineManager();
  $scope.makefullUser();
  //  defineSelectedUsername();
  //$scope.doTruckQuery();

});
