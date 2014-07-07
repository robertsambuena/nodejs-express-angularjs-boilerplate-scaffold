var parent_module = "auth";
angular.module( 'ui.freedom.'+ parent_module, [
  parent_module+'.login',
  parent_module+'.config',
  parent_module+'.register',
  
  'template-module'
])
.config( function ( $stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise( '/' );
  /**** THIS CONFIG IS FOR REMOVING THE EXTRA HEADER ANGULAR SEND IN AJAX CALLS(HTTP) ***/ 
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-Width"];
  /*** END ****/
})
.run( function run () {
})
.controller( module_name+'Controller', function ( $scope) {

})
;
