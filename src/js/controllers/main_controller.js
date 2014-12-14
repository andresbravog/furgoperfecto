angular.module('Furgospot.controllers.Main', [])

.controller('MainController', function($scope){
  $scope.paintMap = function($event){
    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
                                  mapOptions);
  }
})

.directive("paintMap",function(){
  var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  var map = new google.maps.Map(document.getElementById("map_canvas"),
                                mapOptions);
  return {
    template: "hello you"
  };
})

.directive("markMapCurrent",function(){
  var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  var map = new google.maps.Map(document.getElementById("map_canvas"),
                                mapOptions);
  return {
    template: "hello you"
  };
})


;