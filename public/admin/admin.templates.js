angular.module('template-module', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("modules/admin/home/home.tpl.html",
    "{{pageTitle}}");
  $templateCache.put("modules/admin/profile/profile.tpl.html",
    "<div class=\"profile-page row\">\n" +
    "	<div class=\"user-content\">\n" +
    "		<div class=\"user\">\n" +
    "			<div class=\"content\">\n" +
    "				<div class=\"info\">\n" +
    "					<a href=\"/{{allUsers[0].custom_url}}\">\n" +
    "						<img class=\"avatar\" ng-src=\"{{allUsers[0].avatar}}\"></img>\n" +
    "						<strong class=\"name\" ng-bind=\"allUsers[0].fname+' '+allUsers[0].lname\"></strong>\n" +
    "					</a>\n" +
    "				</div>\n" +
    "				<div class=\"badges\">\n" +
    "					<span>Badges</span>\n" +
    "					<span class=\"badge\" title=\"{{badge.text}}\" ng-repeat=\"badge in badges\" ng-style=\"{'background-position-x':badge.sprite[0]+'px','background-position-y':badge.sprite[1]+'px'}\"></span>\n" +
    "				</div>\n" +
    "				<div class=\"options\">\n" +
    "					<button class=\"btn btn-small\">Edit Profile</button>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"channel-content\">\n" +
    "		<h4>\n" +
    "			Channels\n" +
    "			<button type=\"button\" class=\"btn btn-default btn-small\">\n" +
    "		  <i class=\"fa fa-plus\"></i>\n" +
    "		</button>\n" +
    "		</h4>\n" +
    "		<div class=\"channel\">\n" +
    "			\n" +
    "		</div>\n" +
    "	</div>\n" +
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
