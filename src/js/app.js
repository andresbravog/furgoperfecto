angular.module('Furgospot', [
  'ngRoute',
  'ngTouch',
  'mobile-angular-ui',
  'Furgospot.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'home.html'});
});