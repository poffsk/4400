myApp.controller("manageBldgStationCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";
  $scope.noStatMsgFlag = false;
  /*$scope.bldgDropDown = rows;
  $scope.$apply($scope.mytest);*/

  $scope.goHome = function() {
    window.location.href = 'Home.html';

  }

  $scope.goCreateBldg = function() {
    window.location.href = 'CreateBldg.html';

  }

  $scope.goCreateStat = function() {
    window.location.href = 'CreateStation.html';

  }

  /*  $scope.doCall = function() {
      console.log('CALL login("' + $scope.i_username + '", "' + $scope.i_password + '")');
      conn.getRows($scope.doQuery, 'CALL login("' + $scope.i_username + '", "' + $scope.i_password + '")')
    } */

  console.log(window.location.href);
  var url = new URL(window.location.href);
  var search = new URLSearchParams(url.search);
  console.log(search.get("station"));
  $scope.stationName = search.get("station");


  $scope.doQuery = function() {
    console.log('select buildingName from building')
    conn.getRows(handleData, 'select buildingName from building')
  }

  function handleData(rows) {
    var myList = [];
    for (var buildingInfo of rows) {
      myList.push(buildingInfo.buildingName);
    }

    $scope.shit = myList;
    $scope.$apply($scope.shit);

    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.doQuery2 = function() {
    console.log('select stationName from station')
    conn.getRows(handleData2, 'select stationName from station')
  }

  function handleData2(rows) {
    var myList2 = [];
    for (var stationInfo of rows) {
      myList2.push(stationInfo.stationName);
    }

    $scope.shit2 = myList2;
    $scope.$apply($scope.shit2);

    //console.log(rows);
    $scope.mytest2 = rows;
    $scope.$apply($scope.mytest2);
  }



  $scope.updateStation = function() {
    if (typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableResult[$scope.selectedRow]);
      var currRow = $scope.tableResult[$scope.selectedRow];
      console.log(currRow.stationName);
      if (currRow.stationName != null && currRow.stationName.length > 0) {
        conn.getRows($scope.doQuery3, 'CALL ad_filter_building_station(' + currRow.stationName + ')');
        window.location.href = 'updateStation.html?stationName=' + currRow.stationName;
      } else {
        $scope.noStatMsgFlag = true;
      }

    }
  }

  $scope.doQuery3 = function() {
    console.log('select * from ad_filter_building_station_result');
    conn.getRows(handleTableData, 'select * from ad_filter_building_station_result');
  }

  $scope.updateBuilding = function() {
    if (typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableResult[$scope.selectedRow]);
      var currRow = $scope.tableResult[$scope.selectedRow];
      window.location.href = 'updatebldg.html?building=' + currRow.buildingName + "&stationName=" + currRow.stationName;
    }
  }

  $scope.deleteBuilding = function() {
    if (typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableResult[$scope.selectedRow]);
      var currRow = $scope.tableResult[$scope.selectedRow];
      conn.getRows($scope.doProcedure(),'call ad_delete_building("' + currRow.buildingName + '")')
      }
  }

  function handleNullData(rows){
  }

  $scope.deleteStation = function() {
    if (typeof $scope.tableResult[$scope.selectedRow] != "undefined") {
      console.log($scope.selectedRow);
      console.log($scope.tableResult[$scope.selectedRow]);
      var currRow = $scope.tableResult[$scope.selectedRow];
      conn.getRows($scope.doProcedure(),'call ad_delete_station("' + currRow.stationName + '")')
      }
  }

  function handleNullData(rows){
  }

  $scope.doProcedure = function() {
    var buildingName;
    var buildingTag;
    var stationName;
    var minCapacity;
    var maxCapacity;

    if (typeof $scope.i_buildingName != "undefined" && $scope.i_buildingName.length > 0) {
      buildingName = '"' + $scope.i_buildingName + '"';
    } else {
      buildingName = 'null';
    }

    if (typeof $scope.i_buildingTag != "undefined" && $scope.i_buildingTag.length > 0) {
      buildingTag = '"' + $scope.i_buildingTag + '"';
    } else {
      buildingTag = 'null';
    }

    if (typeof $scope.i_stationName != "undefined" && $scope.i_stationName.length > 0) {
      stationName = '"' + $scope.i_stationName + '"';
    } else {
      stationName = 'null';
    }


    if (typeof $scope.i_minCapacity != "undefined" && $scope.i_minCapacity.length > 0) {
      minCapacity = '"' + $scope.i_minCapacity + '"';
    } else {
      minCapacity = 'null';
    }

    if (typeof $scope.i_maxCapacity != "undefined" && $scope.i_maxCapacity.length > 0) {
      maxCapacity = '"' + $scope.i_maxCapacity + '"';
    } else {
      maxCapacity = 'null';
    }

    conn.getRows($scope.doQuery3, 'CALL ad_filter_building_station(' + buildingName + ', ' + buildingTag + ', ' + stationName + ', ' + minCapacity + ', ' + maxCapacity + ')');
  }

  $scope.doQuery3 = function() {
    console.log('select * from ad_filter_building_station_result');
    conn.getRows(handleTableData, 'select * from ad_filter_building_station_result');
  }


  function handleTableData(rows) {
    console.log('we handled that table!');
    console.log(rows);
    $scope.tableResult = rows;
    $scope.$apply($scope.tableResult);
  }

  /*  $scope.doQuery3 = function() {
  conn.getRows(handleTableData, `SELECT * FROM
    (SELECT buildingInfo.buildingName, tags, stationInfo.stationName, stationInfo.capacity, foodTruckNames FROM
      (SELECT B.buildingName, GROUP_CONCAT(BT.tag) as "tags" FROM Building as B LEFT JOIN BuildingTag as BT on B.buildingName = BT.buildingName GROUP BY B.buildingName) as buildingInfo LEFT JOIN
      (SELECT S.stationName, S.capacity, S.buildingName, GROUP_CONCAT(F.foodTruckName) as "foodTruckNames" FROM Station as S LEFT JOIN FoodTruck as F on S.stationName = F.stationName GROUP BY S.stationName) as stationInfo
    ON buildingInfo.buildingName = stationInfo.buildingName
    GROUP BY buildingInfo.buildingName) as innerTable
  WHERE ("`+ i_buildingName +`" is NULL OR "`+i_buildingName +`" = "" OR buildingName = "`+i_buildingName +`")
    AND ("`+@scope.i_buildingTag+`" is NULL OR "`+@scope.i_buildingTag+`" = "" OR tags LIKE CONCAT('%', "`+@scope.i_buildingTag+`", '%'))
    AND ("`+@scope.i_stationName+`" is NULL OR "`+@scope.i_stationName+`" = "" OR stationName = "`+@scope.i_stationName+`")
    AND ("`+@scope.i_minCapacity+`" is NULL OR capacity >= "`+@scope.i_minCapacity+`")
    AND ("`+@scope.i_maxCapacity+`" is NULL OR capacity <= "`+@scope.i_maxCapacity+`");`);

  } */

  /*$scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }*/

  // Run actions on start
  $scope.doQuery();
  $scope.doQuery2(); //$scope.doQuery3();

});
