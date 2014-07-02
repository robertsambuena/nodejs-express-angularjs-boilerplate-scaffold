angular.module( 'admindashboard.profile', ['admindashboard.config'])
.config(function config( $stateProvider, configProvider) {
  $stateProvider.state( 'profile', {
    url: '/profile',
    views: {
      "main": {
        controller: 'profileController',
        templateUrl: 'modules/'+configProvider.module_name+'/profile/profile.tpl.html'
      }
    },
    data:{ pageTitle: 'Profile' }
  });
})

.controller( 'profileController', function ( $scope, $http) { 
      $scope.test = "profile page";
})
;
