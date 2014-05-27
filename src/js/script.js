(function (root) {

	var user_info,
		doc = root.document,
		api = 'http://localhost:8000/',
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
		activateLink = function (ctx, next) {
			var temp = _$('[href="/' + ctx.path.split('/')[1] + '"]')[0];
			_$('.active')[0] && (_$('.active')[0].className = '');
			temp && (temp.className = 'active');
			next();
		},
		register = function () {
			var data;

			data = (data = Cookies.get('data'))
				? JSON.parse(data)
				: false;

			if (!data) {
				data = {};
				data.fname = data.lname = data.email = data.avatar = data.google_refresh_token = '';
			}

			Cookies.expire('data');
			data.referrer = '';
			content_div.innerHTML = t('registration', data);
			_$('#registration_form').addEventListener('submit', function (e) {
				var form = e.target,
					data = serialize(form);
				e.preventDefault();
				console.dir(data);
				// validate data
				curl.post(api + 'register')
					.send(data)
					.then(function (data) {
						alert('Registration successful :)');
					})
					.onerror(function (err) {
						alert('Registration failed :( Please try again');
						console.dir(err);
					});
				return false;
			}, true);
		},
		error = function () {
			console.dir(Cookies.get('error'));
		},
		profile = function (ctx) {
			if (!user_info)
				return logout();
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

					//validate data

					curl.put(api + 'user')
						.send(data)
						.then(function (data) {
							user_info = data.user_data;
							alert('Update successful :)');
						})
						.onerror(function (err) {
							alert('Update failed :(');
						});
					return false;
				}, true);
			}
			else
				content_div.innerHTML = t('profile', {
					name : user_info.profile_info.fname + ' ' + user_info.profile_info.lname,
					avatar : user_info.profile_info.avatar,
					class : user_info.class || 'Newbie'
				});
		},
		overview = function () {
			content_div.innerHTML = t('overview');
		},
		welcome = function () {
			content_div.innerHTML = 'Welcome';
		},
		about = function () {
			content_div.innerHTML = t('about');
		},
		choose = function (ctx) {
			switch (ctx.params.class) {
				case 'partner' :
					content_div.innerHTML = t('partner_contract');
					break;
				case 'staff' :
					content_div.innerHTML = t('staff_contract');
					break;
				case 'decline' :
					content_div.innerHTML = 'Awww :( sad';
					break;
				default :
					content_div.innerHTML = t('choose');
			}
		},
		partner = function (ctx) {
		},
		staff = function (ctx) {
			switch (ctx.params.action) {
				case 'accept' :
					curl.post(api + 'staff')
						.then(function (data) {
							console.dir(data);
						});
					break;
			}
		},
		channels = function (ctx) {
			var data,
				datum;
			if (user_info) {
				switch (ctx.params.action) {
					case 'add':
						if (Cookies.get('channels')) {
							data = JSON.parse(Cookies.get('channels'));
							Cookies.expire('channels');
							content_div.innerHTML = t('add_channel', {data : JSON.stringify(data, null, 4)});
							_$('#add_channel_form').addEventListener('submit', function (e) {
								e.preventDefault();
								datum = data.items[0];
								datum.network_id = serialize(e.target).network_id;
								curl.post(api + 'channel/add')
									.send(datum)
									.then(function () {
										alert('yay success');
									})
									.onerror(function (e) {
										console.dir(e);
										alert(e.message || e);
									});
								return false;
							});
						} else {
							page.show('/channels');
						}
						break;
					case 'accept' :
						curl.post(api + 'partner')
							.then(function (data) {
								page.show('/channels');
							});
						break;
					default :
						curl.get(api + 'channels')
							.then(function (data) {
								console.dir(data);
								user_info.channels = data;
								content_div.innerHTML = t('channels', {
									api : api,
									data : JSON.stringify(user_info.channels, null, 4)
								});
							});
				}
			}
			else
				logout();
		},
		logout = function () {
			curl.get(api + 'logout')
				.finally(function () {
					var temp = _$('#collapse_button');
					user_info = null;
					setProfileNav();
					temp.className = '';
					temp.click();
					page.show('/');
				});
		},
		notFound = function () {
			content_div.innerHTML = t('not_found');
		},
		prospect = function (ctx) {
			var search_result = {},
				prospects,
				bindDeleteButton = function () {
					_$('#delete_prospect_button').addEventListener('click', function (e) {
						var ids = toArray(_$('input:checked'))
									.map(function (a) {
										return a.value;
									});

						if (ids.length === 0)
							return alert('Select channels that you want to delete by clicking the checkbox on the leftmost column');
						if (!confirm('Are you sure you want to delete these prospect' + (ids.length === 1 ? '':'s') + '?'))
							return false;

						curl.delete(api + 'prospect/delete')
							.send({ids : ids})
							.then(function (data) {
								ids.forEach(function (a) {
									var e = _$('#prospect_' + a + '_tr');
									e.parentNode.removeChild(e);
								});
								prospects = prospects.filter(function (a) {
									var toBeSaved = !~ids.indexOf('' + a._id),
										button = _$('#recruit_button');

									if (!toBeSaved && search_result.username === a.username) {
										button.disabled = false;
										button.className = '';
										button.innerHTML = 'Recruit!';
									}
									return toBeSaved;
`							})
							.onerror(function (e) {
								console.dir(e);
							});
					}, true);
				},
				bindSubmitForm = function () {
					_$('#search_form').addEventListener('submit', function (e) {
						var temp = '<br />Channel not found.',
							button,
							temp2;
						e.preventDefault();
						curl.get(api + 'channel/search/' + encodeURIComponent(e.target.q.value))
							.then(function (res) {
								temp2 = res.is_recruited;
								res = res.search_result;
								search_result = {};
								if (res.items.length > 0) {
									res = res.items[0];
									search_result.username = e.target.q.value;
									search_result.owner = res.snippet.title;
									search_result.thumbnail = res.snippet.thumbnails.default.url;
									temp = t('prospect_result', {
										img : res.snippet.thumbnails.default.url,
										title : res.snippet.title,
										subscribers : res.statistics.subscriberCount.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
										views : res.statistics.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
										videos : res.statistics.videoCount.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
										rating : classifyChannelByViews(+res.statistics.viewCount),
									});
								}
							})
							.finally(function () {
								_$('#prospect_result_div').innerHTML = temp;
								button = _$('#recruit_button');
								if (temp2.length > 0) {
									button.disabled = true;
									button.className = 'disabled';
									button.innerHTML = 'Recruited';
								}
								bindRecruitButton();
							});
						return false;
					}, true);
				},
				bindRecruitButton = function () {
					_$('#recruit_button') &&
					_$('#recruit_button').addEventListener('click', function (e) {
						curl.post(api + 'prospect/add')
							.send(search_result)
							.then(function (r) {
								var lead_length;
								e.target.disabled = true;
								e.target.className = 'disabled';
								e.target.innerHTML = 'Recruited';
								prospects.push(r.prospect);
								lead_length = prospects.filter(function (a) {
									return a.status === 'Lead';
								}).length;
								r.prospect.note = (r.prospect.note || 'None as of the moment');
								_$('#prospect_table_tbody').innerHTML += t('prospect_result_tr', r.prospect);
								_$('#leads_a').innerHTML = 'Leads '  + (lead_length === 0 ? '' : ('[' + lead_length + ']'));
							})
							.onerror(function (e) {
								console.dir(e);
							});
					}, true);
				},
				setProspects = function (status) {
					var temp = prospects.filter(function (a) {
							return a.status === status;
						}),
						i = temp.length,
						html = '',
						lead_length = prospects.filter(function (a) {
							return a.status === 'Lead';
						}).length,
						contacted_length = prospects.filter(function (a) {
							return a.status === 'Contacted';
						}).length,
						pitched_length = prospects.filter(function (a) {
							return a.status === 'Pitched';
						}).length,
						demo_length = prospects.filter(function (a) {
							return a.status === 'Demo';
						}).length,
						negotiating_length = prospects.filter(function (a) {
							return a.status === 'Negotiating';
						}).length,
						closed_lost_length = prospects.filter(function (a) {
							return a.status === 'Closed (lost)';
						}).length,
						closed_won_length = prospects.filter(function (a) {
							return a.status === 'Closed (won)';
						}).length;


					_$('[href="/prospect/' + status + '"]')[0].className = 'selected';

					_$('#prospect_table_tbody').innerHTML = '';
					while (i--) {
						temp[i].note = (temp[i].note || '');
						_$('#prospect_table_tbody').innerHTML += t('prospect_result_tr', temp[i]);
					}

					_$('#leads_a').innerHTML = 'Leads '  + (lead_length === 0 ? '' : ('[' + lead_length + ']'));
					_$('#contacted_a').innerHTML = 'Contacted '  + (contacted_length === 0 ? '' : ('[' + contacted_length + ']'));
					_$('#pitched_a').innerHTML = 'Pitched '  + (pitched_length === 0 ? '' : ('[' + pitched_length + ']'));
					_$('#demo_a').innerHTML = 'Demo '  + (demo_length === 0 ? '' : ('[' + demo_length + ']'));
					_$('#negotiating_a').innerHTML = 'Negotiating '  + (negotiating_length === 0 ? '' : ('[' + negotiating_length + ']'));
					_$('#closed_lost_a').innerHTML = 'Closed (lost) '  + (closed_lost_length === 0 ? '' : ('[' + closed_lost_length + ']'));
					_$('#closed_won_a').innerHTML = 'Closed (won) '  + (closed_won_length === 0 ? '' : ('[' + closed_won_length + ']'));

				},
				getProspects = function () {
					curl.get(api + 'prospects')
						.then(function (a) {
							prospects =  a;
							content_div.innerHTML = t('prospect');
							bindSubmitForm();
							bindDeleteButton();
							_$('#prospect_search_input').focus();
							setProspects(ctx.params.action || 'Lead');
						});
				};
			getProspects();
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
			}
			else
				_$('#profile_nav_div').innerHTML = t('signin', { api : api });
		},




		/**
			setup functions
		*/



		serialize = function (f) {
			var i = f.length,
				ret = {};
			while (i--) {
				if (f[i].type === 'submit') continue;
				ret[f[i].name] = f[i].value;
			}
			return ret;
		},

		start = function () {
			if (Cookies.get('access_token'))
				curl.to(api + 'user')
					.then(function (data) {
						user_info = data;
						_$('#collapse_button').click();
						page.show(root.location.pathname === '/'
							? '/overview'
							: root.location.pathname);
					})
					.onerror(logout)
					.finally(setProfileNav);
			else {
				page.show(root.location.pathname);
				setProfileNav();
			}
		},


		/**
			Helper functions
		*/

		classifyChannelByViews = function (count) {
			if (count >= 10000000) return 'Excellent!!';
			if (count >= 5000000) return 'Very Good!';
			if (count >= 1000000) return 'Good :)';
			if (count >= 500000) return 'Average';
			if (count >= 250000) return 'Below Average';
			if (count >= 100000) return 'Poor';
			return 'Very Poor :(';
		},
		toArray = function (nl) {
			var arr = [],
				i,
				l;
			for (i =- 1, l = nl.length >>> 0; ++i !== l; arr[i] = nl[i]);
			return arr;
		}
		;




	/**
		Setup Pages
	**/
	page('*', activateLink);
	page('/', welcome);
	page('/register', register);
	page('/profile/:action?', profile);
	page('/overview', overview);
	page('/about', about);
	page('/choose/:class?', choose);
	page('/partner', partner);
	page('/staff', staff);
	page('/channels/:action?', channels);
	page('/error', error);
	page('/prospect/:action?', prospect);
	page('*', notFound);




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

	doc.body.addEventListener('click', function (e) {
		var href = e.target.getAttribute('href');
		if (href && !~href.indexOf('http://')) {
			e.preventDefault();
			page.show(href);
			return false;
		}
	}, true);


	root.onpopstate = page;


	/**
		configure libraries then start
	*/
	NProgress.configure({ showSpinner: false });
	start();

} (this) );
