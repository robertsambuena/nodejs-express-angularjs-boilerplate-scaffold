var module_name = "login";
var module_route = "login";
var module_state = "login";
angular.module( parent_module+'.'+module_name, [])
.config(function config( $stateProvider ) {
  $stateProvider.state( module_state, {
    url: '/'+module_route,
    views: {
      "main": {
        controller: module_name+'Controller',
        templateUrl: 'modules/'+parent_module+'/'+module_name+'/template.tpl.html'
      }
    },
    data:{ pageTitle: module_name }
  });
})

.controller( module_name+'Controller', function ( $scope, $http) {
  
  
})
;
