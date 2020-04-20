myApp.controller("updatebldgCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  const errormsg = require("../js/controllers/errormsg.js");
  $scope.mytest = "No data yet!";

  function handleData(rows) {
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  function defineBuilding() {
    console.log(window.location.href);
    var url = new URL(window.location.href);
    var search = new URLSearchParams(url.search);
    console.log(search.get("building"));
    $scope.buildingName = search.get("building");
    $scope.buildingNameOld = search.get("building");
  }


  $scope.doCall = function() {
    conn.getRows($scope.doQuery, 'CALL ad_view_building_general("' + $scope.buildingName + '")')
  }

  $scope.doQuery = function() {
    conn.getRows(handleData, 'select * from ad_view_building_general_result')
  }

  function handleData(rows) {
    //console.log(rows);
    if (rows != null && rows.length > 0) {
      $scope.buildDescr = rows[0].description;
      $scope.$apply($scope.buildDescr);
    }

  }

  $scope.updateBuilding = function() {
    // TO DO
    if (typeof $scope.buildingName != "undefined" && $scope.buildingName != "" && $scope.buildDescr != "" && $scope.tagData.length > 0){
    conn.getRows($scope.doTagCall, 'CALL ad_update_building("' + $scope.buildingNameOld + '", "' + $scope.buildingName + '", "' + $scope.buildDescr + '")');
    $scope.buildingNameOld = $scope.buildingName;
        //// TODO: need to have a UNIQUE building name entered and a description and a tag
  }
  else {errormsg.showErrorMsg("error","Need more information");}
  }

  function dummyFunction() {
    console.log('am dummy');
  }


  $scope.doTagCall = function() {
    conn.getRows($scope.doTagQuery, 'CALL ad_view_building_tags("' + $scope.buildingName + '")');
  }

  $scope.doTagQuery = function() {
    conn.getRows(handleTagData, 'select * from ad_view_building_tags_result');
  }

  function handleTagData(rows) {
    console.log(rows);
    var tagList = [];
    for (var tagInfo of rows) {
      tagList.push(tagInfo.tag);
    }

    $scope.tagData = tagList;
    $scope.$apply($scope.tagData);

  }

  $scope.addTag = function() {
    errormsg.closeErrorMsg();
    if ($scope.tagData.indexOf($scope.newTag) < 0 && $scope.buildingName != "" && $scope.newTag != "" && typeof $scope.newTag != "undefined") {
      $scope.tagData.push($scope.newTag);
      //* TO DO
      var query = 'call ad_add_building_tag("' + $scope.buildingName + '", "' + $scope.newTag + '")';
      console.log(query);
      conn.getRows(null, query);
      $scope.newTag = "";
      $scope.dupTagMsgFlag = false;
    } else {
    errormsg.showErrorMsg("error","Need better information");
    }
    console.log($scope.tagData);

  }

  $scope.removeTag = function(tagVal) {
    errormsg.closeErrorMsg();
    if ($scope.buildingName != "") {
      var tagIndex = $scope.tagData.indexOf(tagVal);
      $scope.tagData.splice(tagIndex, 1);
      console.log($scope.tagData);
      var query = 'call ad_remove_building_tag("' + $scope.buildingName + '", "' + tagVal + '")';
      console.log(query);
      conn.getRows(null, query);
    }
  }


  $scope.goScreen4 = function() {
    console.log('why');
    window.location.href = 'ManageBldgStation.html';
  }

  defineBuilding();
  $scope.doQuery();
  $scope.doCall();
  $scope.doTagCall();


});
