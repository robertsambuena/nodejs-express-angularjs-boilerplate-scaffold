var module_name = "register";
var module_route = "register";
var module_state = "registration";
angular.module(parent_module+'.'+module_name, [])
.config(function config( $stateProvider ) {
  $stateProvider.state( module_route, {
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
  console.log(return_val.email);
  $scope.register = function(userinfo) {
    
    $http.post('/register', userinfo).success(function() {
      console.log(data);
    }).error(function(){

    });
  };
})
;
