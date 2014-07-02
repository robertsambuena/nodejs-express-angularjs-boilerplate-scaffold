angular.module( 'ui.freedom.admin', [
  'admindashboard.profile',
  'admindashboard.overview',
  'template-module'
])
.config( function ( $stateProvider, $urlRouterProvider, $httpProvider, configProvider) {
  $urlRouterProvider.otherwise( '/overview' );
  /**** THIS CONFIG IS FOR REMOVING THE EXTRA HEADER ANGULAR SEND IN AJAX CALLS(HTTP) ***/ 
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  /*** END ****/
})
.run( function run () {
})
.controller( 'adminController', function ( $scope) {
  console.log('adminController');
})
.controller( 'menuController', function ( $scope, routeService) {
  $scope.baseurl = routeService.getBaseUrl;
  console.log($scope.baseurl);
})
;
