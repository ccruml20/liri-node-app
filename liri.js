
var Twitter = require('twitter');
var keys = require('./keys.js');



	var client = new Twitter(keys);
	var params = {screen_name: 'ccruml20'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log(tweets);
		}
	})();



