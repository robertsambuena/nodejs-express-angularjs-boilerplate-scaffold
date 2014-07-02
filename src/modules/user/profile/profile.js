angular.module( 'userdashboard.profile', [])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'profile', {
    url: '/profile',
    views: {
      "main": {
        controller: 'profileController',
        templateUrl: 'modules/user/profile/profile.tpl.html'
      }
    },
    data:{ pageTitle: 'Profile' }
  });
})

.controller( 'profileController', function ( $scope, $http) { 
      $scope.test = "profile page";
})
;
