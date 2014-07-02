angular.module( 'userdashboard.authentication', [])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'loginController',
        templateUrl: 'modules/user/authentication/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  }).state( 'register', {
    url: '/register',
    views: {
      "main": {
        controller: 'registrationController',
        templateUrl: 'modules/user/authentication/register.tpl.html'
      }
    },
    data:{ pageTitle: 'Register' }
  });
})

.controller( 'loginController', function ( $scope, $http, $state, localStorageService, $stateChangeSuccess) {
  $scope.login = function(credential) {
    var users = localStorageService.get("users");
    var user = $scope.validateUser(users, credential);
    console.log(user);
    if(user) {
      localStorageService.set("currentUser", user);
      $state.go("home");
    }
  };
  $scope.validateUser = function(users, credential) {
    if(users) {
      var returnUser = {};
      angular.forEach(users, function(user) {
        console.log(user.uname+" === "+credential.uname+" && "+user.pass+" === "+credential.pass);
        if(user.uname === credential.uname && user.pass === credential.pass) {
          console.log("user", user);
          returnUser = user;
        }
      });
      return returnUser;
    }
  };
})
.controller( 'registrationController', function ( $scope, $http, localStorageService) {
    console.log("test1");
    var users = localStorageService.get("users");
    console.log("users", users);
    $scope.register = function (registerInfo, success, error) {
      $scope.error = {};
      var users = localStorageService.get("users");
      console.log(users);
      if($scope.isUserExists(users, registerInfo)) {
        if(!users) users = [];
        users.push(registerInfo);
        localStorageService.remove("users");
        localStorageService.set("users", users);
        $scope.registerInfo = {};
        $scope.error = {};
        $scope.success = {
          'id':'success', 
          'message':'Success! To login, click'
        };
      }
      else {
        // $scope.$apply("$scope."+error+" = {'id':'userexist','message':'User already exist',}");
        // $eval("$scope."+error+" = {'id':'userexist','message':'User already exist',}");
        $scope.error = {'id':'userexist','message':'User already exist'};
      }
      return false;
    };
    $scope.isUserExists = function(users, registerInfo) {
      if(users) {
        angular.forEach(users, function(user) {
          if(user.uname == registerInfo.uname) {
            return false;
          }
        });
        return true;
      }
      return false;
    };
})
;

