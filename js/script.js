(function (root) {

	var doc = root.document,
		api = 'http://localhost:8000/',
		_$ = function (s) {
			if (s[0] === '#') return doc.getElementById(s.substring(1));
			return doc.querySelectorAll(s);
		};

	_$('#sign_in_button').addEventListener('click', function () {
		root.location = api + 'auth/google';
	}, true);

} (this) );
