myApp.controller("createbldgCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  $scope.tagList = [];
  var tagCount = 0;
  $scope.dupTagMsgFlag = false;


  function handleData(rows) {
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }


  $scope.addTag = function() {
    if ($scope.tagList.indexOf($scope.newTag) < 0 && $scope.newTag != null && $scope.newTag.length > 0/* && $scope.i_buildingName != "undefined" && $scope.i_buildingName.length > 0 */ ) {
      $scope.tagList.push($scope.newTag);
      //* TO DO
      // var query = 'call ad_add_building_tag("' + $scope.i_buildingName + '", "' + $scope.newTag + '")';
      //  console.log(query);
      //  conn.getRows(null, query);
      $scope.newTag = "";
      $scope.dupTagMsgFlag = false;
    } else {
      $scope.dupTagMsgFlag = true;
    }
    console.log($scope.tagList);

  }

  $scope.removeTag = function(tagVal) {
    var tagIndex = $scope.tagList.indexOf(tagVal);
    $scope.tagList.splice(tagIndex, 1);
    console.log($scope.tagList);
    //  var query = 'call ad_remove_building_tag("' + $scope.i_buildingName + '", "' + tagVal + '")';
    //  console.log(query);
    //  conn.getRows(null, query);
  }

  $scope.goScreen4 = function() {
    window.location.href = 'ManageBldgStation.html';
  }

  $scope.doRedirect = function() {
    window.location.href = 'ManageBldgStation.html';
  }

  $scope.addSQLTags = function() {
    console.log('call ad_add_building_tag("' + $scope.i_buildingName + '", "' + $scope.newTag + '")');
    tagCount = $scope.tagList.length;
    for (tag of $scope.tagList) {
      conn.getRows(updateTagLength, 'call ad_add_building_tag("' + $scope.i_buildingName + '", "' + tag + '")');
    }
  }

  function updateTagLength() {
    tagCount--;
    if (tagCount <= 0) {
      $scope.doRedirect();
    }
  }

  $scope.createData = function() {
    if ($scope.i_buildingName != "undefined" && $scope.i_buildingName.length > 0 && $scope.i_description != "undefined" && $scope.i_description.length > 0 && $scope.tagList != "undefined" && $scope.tagList.length > 0) {
      console.log('CALL ad_create_building("' + $scope.i_buildingName + '", "' + $scope.i_description + '")');
      conn.getRows($scope.addSQLTags, 'CALL ad_create_building("' + $scope.i_buildingName + '", "' + $scope.i_description + '")')
    }
  }


});
