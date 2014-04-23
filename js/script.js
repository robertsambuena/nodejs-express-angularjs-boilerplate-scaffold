(function (root) {

	var doc = root.document,
		api = 'http://localhost:8000/',
		ajax = function microAjax(method, url, cb, payload) {
			var req = new XMLHttpRequest();
			req.open(method, url, true);
			req.withCredentials = true;
			req.onreadystatechange = function () {
				var data;
				if (req.readyState === 4) {
					data = JSON.parse(req.responseText);
					if (req.status === 200) {
						return cb(null, data);
					}
					cb(data.data || data.message || req.responseText, null, req.status);
				}
			};
			req.onerror = function (err) {
				cb(err, null, 500);
			};
			req.send(JSON.stringify(payload));
		},
		_$ = function (s) {
			if (s[0] === '#') return doc.getElementById(s.substring(1));
			return doc.querySelectorAll(s);
		},
		t = function (s, d) {
			var p;
			s = document.getElementById('tmpl-' + s).innerHTML;
			for (p in d)
				s = s.replace(new RegExp('{'+p+'}', 'g'), d[p]);
			return s;
		},


		/**
			page callbacks
		*/
		edit = function () {

		},
		overview = function () {
			var mapData = function (err, data, code) {
				if (err) {

				}
				else {
					console.dir(data);
					setProfileNav(data);
				}
			};
			if (Cookies.get('access_token'))
				ajax('GET', api + 'user', mapData);
			else
				page.show('');
		},
		login = function () {

		},

		/**
			templates
		*/
		setProfileNav = function (data) {
			var a = document.getElementById('profile_nav_div');
			a.innerHTML = t('profile-nav', data.profile_info);
		}
		;

	/**
		Setup Pages
	**/
	page('edit', edit);
	page('overview', overview);
	page('*', login);

	/**
		Bind events
	**/
	_$('#sign_in_button').addEventListener('click', function () {
		root.location = api + 'auth/google';
	}, true);

	if (Cookies.get('access_token')) {
		page.show('overview');
	} else {
		page.show('');
	}

} (this) );

