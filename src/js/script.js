(function (root) {

	var user_info,
		doc = root.document,
		api = 'http://localhost:8000/',
		ajax = function (method, url, cb, payload) {
			var req = new XMLHttpRequest();
			NProgress.start();
			req.open(method, url, true);
			req.withCredentials = true;
			req.setRequestHeader('Content-Type', 'application/json');
			req.onreadystatechange = function () {
				var data;
				if (req.readyState === 4) {
					data = JSON.parse(req.responseText);
					NProgress.done();
					if (req.status === 200)
						return cb(null, data);
					cb(data.data || data.message || req.responseText, null, req.status);
				}
			};
			req.onerror = function (err) {
				NProgress.done();
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
			s = _$('#' + s + '_tmpl').innerHTML;
			for (p in d)
				s = s.replace(new RegExp('{'+p+'}', 'g'), d[p]);
			return s;
		},

		/**
			cached DOM elements
		*/
		content_div = _$('#content_div'),


		/**
			page callbacks
		*/
		register = function () {
			console.dir(Cookies.get('data'));
		},
		error = function () {
			console.dir(Cookies.get('error'));
		},
		profile = function (ctx) {
			if (!user_info) return page.show('login');
			_$('.active')[0] && (_$('.active')[0].className = '');
			_$('#profile_a').className = 'active';
			if (ctx.params.action === 'edit') {
				content_div.innerHTML = t('edit_profile', {
					fname : user_info.profile_info.fname,
					lname : user_info.profile_info.lname,
					skype : user_info.contact_info.skype || '',
					avatar : user_info.profile_info.avatar || '',
					twitter : user_info.contact_info.twitter || '',
					city : user_info.contact_info.address.city || '',
					facebook : user_info.contact_info.facebook || '',
					state : user_info.contact_info.address.state || '',
					phone : user_info.contact_info.phone.join(', ') || '',
					country : user_info.contact_info.address.country || '',
					postal_code : user_info.contact_info.address.postal_code || '',
					street_address : user_info.contact_info.address.street_address || ''
				});
				_$('#edit_profile_form').addEventListener('submit', function (e) {
					var form = e.target,
						data = serialize(form);
					e.preventDefault();
					console.dir(data);
					ajax('PUT', api + 'user', function (ret) {
						console.dir(ret);
						alert('Update successful :)');
					}, data);
					return false;
				}, true);
			} else {
				content_div.innerHTML = t('profile', {
					name : user_info.profile_info.fname + ' ' + user_info.profile_info.lname,
					avatar : user_info.profile_info.avatar,
					class : user_info.class || 'Newbie'
				});
				preventAllReloads('#edit_profile_button');
			}
			NProgress.done();
		},
		overview = function () {
			_$('.active')[0] && (_$('.active')[0].className = '');
			_$('#overview_a').className = 'active';
			content_div.innerHTML = '';
			NProgress.done();
		},
		login = function () {
			content_div.innerHTML = '';
		},
		logout = function () {
			ajax('GET', api + 'logout', function (err, data) {
				var temp = _$('#collapse_button');
				user_info = null;
				setProfileNav();
				temp.className = '';
				temp.click();
				page.show('/');
			});

		},

		/**
			templates
		*/
		setProfileNav = function () {
			if (user_info) {
				_$('#profile_nav_div').innerHTML = t('profile_nav', {
					email : user_info.email,
					avatar : user_info.profile_info.avatar
				});
				_$('#profile_avatar_img').addEventListener('click', logout, true);
			} else {
				_$('#profile_nav_div').innerHTML = t('signin');
				_$('#sign_in_button').addEventListener('click', function () {
					root.location = api + 'auth/google';
				}, true);
			}
		},

		/**
			setup functions
		*/
		preventAllReloads = function (e) {
			var a = _$(e || 'a'),
				i = (a = a.length ? a : [a]).length,
				falseF = function (e) {
					e.preventDefault();
					NProgress.start();
					page.show(e.target.pathname);
					return false;
				};
			while (i--)
				a[i].addEventListener('click', falseF, true);
		},

		serialize = function (f) {
			var i = f.length,
				ret = {};
			while (i--) {
				ret[f[i].name] = f[i].value;
			}
			return ret;
		},

		start = function () {
			if (Cookies.get('access_token')) {
				ajax('GET', api + 'user', function (err, data) {
					if (err) {
						console.dir(err);
						logout();
					}
					else {
						user_info = data;
						_$('#collapse_button').click();
						page.show(root.location.pathname === '/' ? '/overview'
							: root.location.pathname);
					}
					setProfileNav();
				});
			}
			else {
				page.show(root.location.pathname);
				setProfileNav();
			}
		}
		;

	/**
		Setup Pages
	**/
	page('/register', register);
	page('/profile/:action?', profile);
	page('/overview', overview);
	page('/login', login);
	page('/error', error);
	page('*', login);

	/**
		Bind events
	**/
	_$('#collapse_button').addEventListener('click', function (e) {
		var temp = _$('#content_div_wrapper').style,
			button = _$('#collapse_button');
		if (button.className === 'collapsed') {
			button.className = '';
			_$('#menu_section').style.display = 'block';
			temp.width = 'calc(100% - 225px)';
			temp.paddingLeft = '225px';
		} else {
			button.className = 'collapsed';
			_$('#menu_section').style.display = 'none';
			temp.width = '100%';
			temp.paddingLeft = '0px';
		}
	}, true);


	/**
		configure libraries then start
	*/
	NProgress.configure({ showSpinner: false });
	preventAllReloads();
	start();

} (this) );
