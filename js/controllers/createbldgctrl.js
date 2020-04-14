myApp.controller("createbldgCtrl", function($scope) {
  const conn = require("../js/controllers/connection.js");
  $scope.mytest = "No data yet!";

  $scope.tagList = [];
  $scope.dupTagMsgFlag = false;


  function handleData(rows){
    console.log(rows);
    $scope.mytest = rows;
    $scope.$apply($scope.mytest);
  }

  $scope.getDisBitchSumData = function(){
    console.log($scope.i_buildingName);
  }

  $scope.addTag = function(){
    if($scope.tagList.indexOf($scope.newTag) < 0){
      $scope.tagList.push($scope.newTag);
      //* TO DO
      var query = 'call ad_add_building_tag("'+$scope.i_buildingName+'", "'+$scope.newTag+'")';
      console.log(query);
      conn.getRows(null, query);
      $scope.newTag = "";
      $scope.dupTagMsgFlag = false;
    }
    else{
      $scope.dupTagMsgFlag = true;
    }
    console.log($scope.tagList);

  }

  $scope.removeTag = function(tagVal){
    var tagIndex = $scope.tagList.indexOf(tagVal);
    $scope.tagList.splice(tagIndex,1);
    console.log($scope.tagList);
    var query = 'call ad_remove_building_tag("'+$scope.i_buildingName+'", "'+tagVal+'")';
    console.log(query);
    conn.getRows(null, query);
  }

  $scope.goScreen4 = function(){
    window.location.href = 'ManageBldgStation.html';
  }

  $scope.createData = function(){
    console.log('CALL ad_create_building("' + $scope.i_buildingName + '", "' + $scope.i_description + '")');
    conn.getRows(null, 'CALL ad_create_building("' + $scope.i_buildingName + '", "' + $scope.i_description + '")')
  }


});
