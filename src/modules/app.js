console.log(module);
angular.module( 'ui.freedom', [
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  module
])
.directive('treeToggle', function () {
  var linker = function(scope,element,attrs) {
    // console.log(element);
    element.bind("click", function(e){
        console.log("click: ", element.children('ul.tree').addClass("show"));
        console.log("click: ", element.children('ul.tree').addClass("hide"));
        // element.children('ul.tree');
    });
  };
  return {
    restrict:'ACE',
    link: linker
  };
})
.controller( 'mainController', function ($scope, $timeout, $stateChangeSuccess) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Freedom!' ;
    }
  });
  $scope.navCollapse = 1;
  $scope.navStyle = {
    height:'1px'
  };
  $scope.test = "asd";
  $scope.toggleNav = function() {
    console.log($scope.navCollapse);
    if($scope.navCollapse==3) {
      $scope.navCollapse = 1;
    }
    else {
      $scope.navCollapse = 2;
      $scope.navStyle = {
        height:'147px'
      };
      $timeout(function(){
        $scope.navCollapse = 3;
        $scope.navStyle = {
          height:'1px'
        };
      }, 500);
    }
  };

  $scope.menuItems = [
    {
      "Home": {
          "Overview":"/overview",
          "Profile":"/profile"
      }
    }
  ];
})
;
