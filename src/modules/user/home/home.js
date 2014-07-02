angular.module('userdashboard.overview', [])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/overview',
    views: {
      "main": {
        controller: 'homeController',
        templateUrl: 'modules/user/home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'homeController', function ( $scope, localStorageService ) {  
  $scope.user = localStorageService.get("currentUser");
})
;

