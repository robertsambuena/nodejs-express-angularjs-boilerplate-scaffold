angular.module('admindashboard.config', [])
.provider('config', function() {
 this.$get = angular.noop;
 this.module_name = "admin";
})
.service( 'routeService', function () {
	this.getBaseUrl = "admin";
})
;
