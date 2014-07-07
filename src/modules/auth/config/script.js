var parent_module = "auth";
var module_name = "config";
angular.module(parent_module+'.'+module_name, [])
.service( 'routeService', function () {
	this.routeBaseUrl = "";
})
;
