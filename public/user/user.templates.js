angular.module('template-module', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("modules/user/authentication/login.tpl.html",
    "<div class=\"profile-container\">\n" +
    "Login\n" +
    "<form ng-submit=\"login(credential)\" ng-init=\"credential={}\">\n" +
    "	<input type=\"text\" ng-model=\"credential.uname\" placeholder=\"username\"></input>\n" +
    "	<input type=\"text\" ng-model=\"credential.pass\" placeholder=\"password\"></input>\n" +
    "	<input type=\"submit\" value=\"SUBMIT\"></input>\n" +
    "</form>\n" +
    "<div ui-sref-active=\"active\">\n" +
    "	<a href=\"#/register\">Register</a>\n" +
    "</div>\n" +
    "</div>");
  $templateCache.put("modules/user/authentication/register.tpl.html",
    "<div class=\"profile-container\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"col-lg-4\" ng-init=\"error={};registerInfo={}\">\n" +
    "			<h4>REGISTER</h4>\n" +
    "			<div class=\"alert alert-danger\" role=\"alert\" ng-show=\"error.id\">\n" +
    "				{{error.message}}\n" +
    "			</div>\n" +
    "			<div class=\"alert alert-danger\" role=\"alert\" ng-show=\"success.id\">\n" +
    "				<p>{{success.message}} <a href=\"#/login\">here</a>.</p>\n" +
    "			</div>\n" +
    "			<form ng-submit=\"register(registerInfo)\">\n" +
    "				<input class=\"form-control margin1\" required type=\"text\" ng-model=\"registerInfo.fname\" placeholder=\"Firstname\"></input>\n" +
    "				<input class=\"form-control margin1\" required type=\"text\" ng-model=\"registerInfo.lname\" placeholder=\"Lastname\"></input>\n" +
    "				<input class=\"form-control margin1\" required type=\"text\" ng-model=\"registerInfo.hobbies\" placeholder=\"Hobbies\"></input>\n" +
    "				<input class=\"form-control margin1\" required type=\"text\" ng-model=\"registerInfo.crush\" placeholder=\"First crush\"></input>\n" +
    "				<input class=\"form-control margin1\" required type=\"text\" ng-model=\"registerInfo.uname\" placeholder=\"username\" ng-class=\"{'has-error':error.id=='userexist'}\"></input>\n" +
    "				<input class=\"form-control margin1\" required type=\"text\" ng-model=\"registerInfo.pass\" placeholder=\"password\"></input>\n" +
    "				<input class=\"form-control margin1\" type=\"submit\" value=\"SUBMIT\"></input>\n" +
    "			</form>\n" +
    "			<!-- <pre>{{registerInfo | json}}</pre> -->\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
  $templateCache.put("modules/user/home/home.tpl.html",
    "WELCOME {{user.fname}} {{user.lname}}");
  $templateCache.put("modules/user/profile/profile.tpl.html",
    "<div class=\"profile-container\">\n" +
    "Profile\n" +
    "</div>");
  $templateCache.put("modules/common/menu/menu.tpl.html",
    "<!-- <div class=\"menu-container\">\n" +
    "  <ul class=\"nav nav-pills nav-stacked\">\n" +
    "    <li ui-sref-active=\"active\">\n" +
    "      <a ui-sref=\"home\">Home</a>\n" +
    "    </li>\n" +
    "    <li ui-sref-active=\"active\">\n" +
    "      <a ui-sref=\"profile\">Profile</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div> -->\n" +
    "\n" +
    "<!-- <link class=\"cssdeck\" rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/css/bootstrap.min.css\">\n" +
    "<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/css/bootstrap-responsive.min.css\" class=\"cssdeck\">\n" +
    "<style type=\"text/css\">\n" +
    ".nav.tree.tree-hide {\n" +
    "  /*-moz-transition: 1s;\n" +
    "  -ms-transition: 1s;\n" +
    "  -o-transition: 1s;\n" +
    "  -webkit-transition: 1s;*/\n" +
    "  transition: height 1s;\n" +
    "  height:0;\n" +
    "  display:block;\n" +
    "  position: relative;\n" +
    "  overflow:hidden;\n" +
    "}\n" +
    ".nav.tree.tree-show {\n" +
    "  max-height:999px;\n" +
    "}\n" +
    "  \n" +
    "</style>\n" +
    "<div class=\"well\" style=\"width:300px; padding: 8px 0;\">\n" +
    "    <div style=\"overflow-y: scroll; overflow-x: hidden; height: 500px;\">\n" +
    "        <ul class=\"nav nav-list\" ng-init=\"show=true\">\n" +
    "            <li ng-repeat=\"(keyItem, valItem) in menuItems\"><label ng-click=\"show=!show\" tree-toggle class=\"tree-toggler nav-header buttonize\">{{keyItem}}</label>\n" +
    "                <ul class=\"nav nav-list tree\" ng-class=\"{'tree-show':show, 'tree-hide':!show}\">\n" +
    "                    <li ng-repeat=\"(keyLink, valLink) in valItem\"><a href=\"#{{valLink}}\">{{keyLink}}</a></li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "            <pre>{{menuItems | json}}</pre>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li><label class=\"tree-toggler nav-header\">Header 2</label>\n" +
    "                <ul class=\"nav nav-list tree\">\n" +
    "                    <li><a href=\"#\">Link</a></li>\n" +
    "                    <li><a href=\"#\">Link</a></li>\n" +
    "                    <li><label class=\"tree-toggler nav-header\">Header 2.1</label>\n" +
    "                        <ul class=\"nav nav-list tree\">\n" +
    "                            <li><a href=\"#\">Link</a></li>\n" +
    "                            <li><a href=\"#\">Link</a></li>\n" +
    "                            <li><label class=\"tree-toggler nav-header\">Header 2.1.1</label>\n" +
    "                                <ul class=\"nav nav-list tree\">\n" +
    "                                    <li><a href=\"#\">Link</a></li>\n" +
    "                                    <li><a href=\"#\">Link</a></li>\n" +
    "                                </ul>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                    <li><label class=\"tree-toggler nav-header\">Header 2.2</label>\n" +
    "                        <ul class=\"nav nav-list tree\">\n" +
    "                            <li><a href=\"#\">Link</a></li>\n" +
    "                            <li><a href=\"#\">Link</a></li>\n" +
    "                            <li><label class=\"tree-toggler nav-header\">Header 2.2.1</label>\n" +
    "                                <ul class=\"nav nav-list tree\">\n" +
    "                                    <li><a href=\"#\">Link</a></li>\n" +
    "                                    <li><a href=\"#\">Link</a></li>\n" +
    "                                </ul>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div> -->\n" +
    "\n" +
    "");
  $templateCache.put("modules/common/topbar/topbar.tpl.html",
    "<div ng-init=\"navCollapsed = true\" class=\"navbar navbar-fixed-top custom-navbar\" role=\"navigation\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" ng-click=\"navCollapsed = !navCollapsed\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand custom-brand\" href=\"#\">\n" +
    "      	<!-- <img src=\"/images/frdm-nav-logo.png\"></img> -->\n" +
    "        <i class=\"fa fa-bars\"></i>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div collapse=\"navCollapsed\" class=\"custom-nav-collapse navbar-collapse collapse\">\n" +
    "      <ul class=\"custom-nav nav navbar-nav navbar-left\">\n" +
    "        <li ui-sref-active=\"active\"><a ui-sref=\"home\"><span>Overview</span></a></li>\n" +
    "        <li ui-sref-active=\"active\"><a ui-sref=\"profile\"><span>Profile</span></a></li>\n" +
    "        <li ui-sref-active=\"active\"><a ui-sref=\"about\"><span>About</span></a></li>\n" +
    "        <li ui-sref-active=\"active\"><a ui-sref=\"others\"><span>Help</span></a></li>\n" +
    "      </ul>\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li ui-sref-active=\"active\" class=\"dropdown\">\n" +
    "          <a ui-sref=\"other\" class=\"dropdown-toggle  cursor-pointer\" data-toggle=\"dropdown\">Dropdown <b class=\"caret\"></b></a>\n" +
    "          <ul class=\"dropdown-menu\">\n" +
    "            <li><a href=\"#\">Action</a></li>\n" +
    "            <li><a href=\"#\">Another action</a></li>\n" +
    "            <li><a href=\"#\">Something else here</a></li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li class=\"dropdown-header\">Nav header</li>\n" +
    "            <li><a href=\"#\">Separated link</a></li>\n" +
    "            <li><a href=\"#\">One more separated link</a></li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!-- <nav class=\"big-btn-wrapper\">\n" +
    "  <button class=\"big-nav-btn\">\n" +
    "    <i class=\"fa fa-bars\"></i>\n" +
    "  </button>\n" +
    "</nav>\n" +
    "<header class=\"big-header\">\n" +
    "  <div class=\"header-wrapper\">\n" +
    "    <div class=\"header-title\">\n" +
    "      <span class=\"section-title\">Freedom!</span>\n" +
    "      <span class=\"chapter-title\">Introduction</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</header>\n" +
    "\n" +
    " -->");
}]);
