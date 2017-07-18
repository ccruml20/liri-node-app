var keys = require('./keys.js');
var inputOne = process.argv[2];
var inputTwo = process.argv[3];
var fs = require('fs');
//Node Command Line Aguments For Calling Specific API Requests
if (inputOne === 'my-tweets') {
    twitterCall();
} else if (inputOne === 'spotify-this-song') {
    spotifyCall();
} else if (inputOne === 'movie-this') {
    movieDataCall();
} else if (inputOne === 'do-what-it-says'){
    fs.readFile('./random.txt', function(err, data) {
        if(err) {
            return console.log(err)
        }
        var file = data.toString().split(",");
        inputOne = file[0];
        inputTwo = file[1];
        spotifyCall();
    });

};

//Twitter Get Request And Return Object Function
function twitterCall() {
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitterKeys);
    var params = { screen_name: 'ccruml20', count: "20" };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var key in tweets) {
                console.log("===========", tweets[key].text);
            }
        }
    });
}

//Spotify API Request and Return Object Function
function spotifyCall() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotifyKeys);
    spotify.search({ type: 'track', query: `${inputTwo}`, limit: '1' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var dataObj = data.tracks.items[0].album;
        console.log("<<<<<<<", data.tracks.items[0].name,">>>>>>>" )
        console.log(`
            Artist(s)= ${dataObj.artists[0].name}
            Song Name = ${data.tracks.items[0].name}
            Spotify Link = ${dataObj.external_urls.spotify}
            Album = ${dataObj.name}
            `);
    });
};


//Movie Database API Request and Return Object Function
function movieDataCall() {
    var request = require('request');
    request(`http://www.omdbapi.com/?t=${inputTwo}&tomatoes=true&${keys.movieKey}`, function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log(`
        	Title = ${bodyObj.Title}
        	Year = ${bodyObj.Year}
        	Rating = ${bodyObj.Ratings[0].Value}
        	Country = ${bodyObj.Country}
        	Language = ${bodyObj.Language}
        	Plot = ${bodyObj.Plot}
        	Actors = ${bodyObj.Actors} 
        	Rotten Tomatoes Rating = ${bodyObj.Ratings[1].Value} 
        	`);
    });
};
