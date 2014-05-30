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
			data.referrer = Cookies.get('referrer_email') || '';
			content_div.innerHTML = t('registration', data);
			_$('#registration_form').addEventListener('submit', function (e) {
				var form = e.target,
					data = serialize(form);
				e.preventDefault();
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
							setMenu();
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
								setMenu();
								page.show('/channels');
							});
						break;
					default :
						curl.get(api + 'channels')
							.then(function (data) {
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
								});

								setProspects(ctx.params.action || 'Lead');
							})
							.onerror(function (e) {
								console.dir(e);
							});
					}, true);
				},
				bindRowEvents = function (select, status, textarea) {
					status && (select.value = status);
					select.addEventListener('change', function (e) {
						curl.put(api + 'prospect/update')
							.send({
								id : parseInt(e.target.value),
								status : e.target.value.split('|')[1]
							})
							.then(function (data) {
								prospects.filter(function (a) {
									return a._id === parseInt(e.target.value);
								})[0].status = e.target.value.split('|')[1];
								setProspects(ctx.params.action || 'Lead');
							})
							.onerror(function (err) {
								console.dir(err);
							});
					});
					textarea.addEventListener('keyup', function (e) {
						curl.put(api + 'prospect/update')
							.send({
								id : e.target.getAttribute('data-id'),
								note : e.target.value || ' '
							})
							.then(function (data) {
								console.log(data);
							})
							.onerror(function (err) {
								console.dir(err);
							});
					});
				},
				bindSubmitForm = function () {
					_$('#search_form').addEventListener('submit', function (e) {
						var temp = '<br />Channel not found.',
							button,
							self,
							temp2;
						e.preventDefault();
						curl.get(api + 'channel/search/' + encodeURIComponent(e.target.q.value))
							.then(function (res) {
								temp2 = res.is_recruited;
								self = res.self;
								res = res.search_result;
								search_result = {};
								if (res.items.length > 0) {
									res = res.items[0];
									search_result.username = e.target.q.value;
									search_result.owner = res.snippet.title;
									search_result.thumbnail = res.snippet.thumbnails.default.url;
									temp = t('prospect_result', {
										scm : res.scm || 'none',
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
								if (self) {
									button.disabled = true;
									button.className = 'disabled';
									button.innerHTML = 'Recruited';
								}
								if (temp2) {
									setOtherRecruits(temp2);
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
								r.prospect.note = (r.prospect.note || 'None as of the moment');
								prospects.push(r.prospect);
								lead_length = prospects.filter(function (a) {
									return a.status === 'Lead';
								}).length;
								_$('#leads_a').innerHTML = 'Leads '  + (lead_length === 0 ? '' : ('[' + lead_length + ']'));
								_$('.remove')[0] && _$('.remove')[0].parentNode.removeChild(_$('.remove')[0]);
								if (ctx.params.action === 'Lead' || !ctx.params.action) {
									_$('#prospect_table_tbody').innerHTML += t('prospect_result_tr', r.prospect);
									// delay
									setTimeout(function () {
										bindRowEvents(_$('#prospect_status_' + r.prospect._id + '_select'), void 0, _$('#prospect_note_' + r.prospect._id + '_textarea'));
									}, 500);
								}
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

					while (i--) {
						temp[i].note = (temp[i].note || '');
						html += t('prospect_result_tr', temp[i]);
					}

					if (temp.length === 0) {
						html = '<tr><td colspan="5" class="remove">Start recruiting now! Just put the channel\'s username on the searchbox above and press enter.</td></tr>';
					}

					_$('#prospect_table_tbody').innerHTML = html;
					_$('#demo_a').innerHTML = 'Demo '  + (demo_length === 0 ? '' : ('[' + demo_length + ']'));
					_$('#leads_a').innerHTML = 'Leads '  + (lead_length === 0 ? '' : ('[' + lead_length + ']'));
					_$('#pitched_a').innerHTML = 'Pitched '  + (pitched_length === 0 ? '' : ('[' + pitched_length + ']'));
					_$('#contacted_a').innerHTML = 'Contacted '  + (contacted_length === 0 ? '' : ('[' + contacted_length + ']'));
					_$('#closed_won_a').innerHTML = 'Closed (won) '  + (closed_won_length === 0 ? '' : ('[' + closed_won_length + ']'));
					_$('#negotiating_a').innerHTML = 'Negotiating '  + (negotiating_length === 0 ? '' : ('[' + negotiating_length + ']'));
					_$('#closed_lost_a').innerHTML = 'Closed (lost) '  + (closed_lost_length === 0 ? '' : ('[' + closed_lost_length + ']'));

					// bind status changes
					i = temp.length;
					while (i--)
						bindRowEvents(_$('#prospect_status_' + temp[i]._id + '_select'), temp[i]._id + '|' + temp[i].status, _$('#prospect_note_' + temp[i]._id + '_textarea'));
				},
				setOtherRecruits = function (others) {
					var html = '',
						i = others.length;
					while (i--) {
						others[i].created_at = new Date(others[i].created_at).toDateString();
						others[i].note = others[i].note || 'N/A';
						html += t('others_prospect', others[i]);
					}
					if (others.length === 0) {
						_$('#other_prospects_count_td').innerHTML = 'No one recruited this channel yet.';
						_$('#prospect_result_tbody').parentNode.deleteRow(3);
					}
					else {
						_$('#prospect_result_tbody').innerHTML += html;
						_$('#other_prospects_count_td').innerHTML = others.length + ' recruiter(s) have already recruited this channel';
					}
				},
				getProspects = function () {
					curl.get(api + 'prospects')
						.then(function (a) {
							prospects =  a;
							content_div.innerHTML = t('prospect', {link : 'http://' + root.location.host + '/via/' + user_info.email});
							bindSubmitForm();
							bindDeleteButton();
							_$('#prospect_search_input').focus();
							setProspects(ctx.params.action || 'Lead');
						});
				};
			getProspects();
		},
		setReferrer = function (ctx) {
			if (ctx.params.email)
				Cookies.set('referrer_email', ctx.params.email);
			root.location.href = '/';
		},
        admin = function(ctx) {
			var dom = _$('#applicants_tmpl'),
				rows = '';

			dom.innerHTML = '<table id="unapproved_table">'+
							'<thead>' +
							'	<tr>' +
							'		<td>Link</td>' +
							'		<td>Channel</td>' +
							'		<td>Last 30 Days</td>' +
							'		<td>View</td>' +
							'	</tr>' +
							'</thead>' +
							'<tbody id="unapproved_partners">'+
							'</tbody></table>';

			if(user_info){
				curl.get(api + 'admin/applicants')
					.send({
						size: ctx.params.size || 10,
						page: ctx.params.page || 1
					})
					.then(function (d) {
						if (d) {
							for(var i in d){
								var element = t('unapproved_list', {
														_id : d[i]._id,
														channel_name : d[i].channel_name,
														last30_days : d[i].last30_days
													});
								rows += element;
							}

							content_div.innerHTML = dom.innerHTML;
							document.getElementById('unapproved_partners').innerHTML = rows;
						} else
							content_div.innerHTML = t('empty');
					})
					.onerror(function (e) {
						console.log(e);
					});
            } else
                logout();
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
		setMenu = function () {
			var dom = _$('#menu_ul'),
				has_class = false,
				classes = ['channel'],
				links = {
					// format : href, html, icon
					all : [
							['/overview', 'Overview', 'home'],
							['/profile', 'You', 'user'],
							['/about', 'About', 'info-circle'],
							['/prospect', 'Prospect', 'users']
						],
					admin : [
						['/admin', 'Administrator', 'star']
					],
					channel : [
						['/channels', 'Channels', 'youtube-play']
					]
				};

			dom.innerHTML = '';
			user_info.app_data.roles.forEach(function (e) {
				if (~classes.indexOf(e))
					has_class = true;

				links[e] && links[e].forEach(function (e) {
					var li = doc.createElement('li'),
						a = doc.createElement('a'),
						icon = doc.createElement('i');
					a.setAttribute('href', e[0]);
					icon.className = 'fa fa-lg fa-' + e[2];
					a.appendChild(icon);
					a.appendChild(doc.createTextNode(e[1]));
					li.appendChild(a);
					dom.appendChild(li);
				});
			});

			if (!has_class)
                dom.innerHTML += '<li><a id="choose_a" class="button" href="/choose">Choose your class</a></li>';

			page.show(root.location.pathname);
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
					.finally(function () {
						setProfileNav();
						setMenu();
					});
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
    page('/admin/:page?/:size?', admin);
    page('/via/:email?', setReferrer);
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
