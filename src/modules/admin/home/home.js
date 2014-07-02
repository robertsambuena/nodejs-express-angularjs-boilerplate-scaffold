angular.module('admindashboard.overview', ['admindashboard.config'])
.config(function config( $stateProvider, configProvider) {
  $stateProvider.state( 'home', {
    url: '/overview',
    views: {
      "main": {
        controller: 'homeController',
        templateUrl: 'modules/'+configProvider.module_name+'/home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'homeController', function ( $scope ) {
  // console.log("asd");
})
;

