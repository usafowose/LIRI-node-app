// DEPENDENCIES

require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require("fs");

// CLI VARIABLES

var command = process.argv[2];
var subject = process.argv.slice(3).join('+');


// FIND CONCERT

var findConcert = function () {
    var URL = "https://rest.bandsintown.com/artists/" + subject + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
        var concertData = response.data[0]
        var concertVenue = concertData.venue.name;
        var venueCity = concertData.venue.city;
        var venueState = concertData.venue.region;
        var concertDate = moment(concertData.datetime).format('MM-DD-YYYY');
        var n = ('\n');
        console.log(`Venue Name: ${concertVenue} ${n}Venue Location: ${venueCity}, ${venueState} ${n}Concert Date: ${concertDate}`);
    });
}


// SPOTIFY

var spotify = new Spotify(keys.spotify)
var findSong = function () {

    if (!subject) {
        subject = "The Sign"
        console.log("No song was passed in input, so here's a song you may be interested in.");
    };

    var URL = "https://api.spotify.com/v1/search/type=track&q=" + subject + "&id=" + spotify[0];
    // CALL TO SPOTIFY API
    spotify.search({ type: 'track', query: subject }, function (err, data) {
        var songInfo =
            `Artist Name: ${data.tracks.items[0].artists[0].name}
         Song Name: ${data.tracks.items[0].name}
         Album: ${data.tracks.items[0].album.name}
         Preview Link: ${data.tracks.items[0].preview_url}`
        console.log(songInfo);
        if (err) {
            console.log(err);
        }

    });

}

// MOVIE SEARCH

var findMovie = function () {
    if (!subject) {
        var nL = "\n";
        console.log(`If you haven't watched 'Mr.Nobody', then you should. ${nL}It's on Netflix!`);
        subject = "Mr. Nobody"
    };
    var URL = `https://www.omdbapi.com/?apikey=trilogy&t=${subject}&plot=full`;
    axios.get(URL).then(function (response) {
        console.log(URL);
        var data = response.data
        var movieData =
        {
            "Title:": data.Title,
            "Year Released:": data.Year,
            "IMDB Rating:": data.imdbRating,
            "Rotten Tomatoes Rating:": data.Ratings[1].Value,
            "Produced In:": data.Country,
            "Language:": data.Language,
            "Plot/Summary:": data.Plot,
            "Actors": data.Actors,
        };
        console.log(movieData);
    });
};

// DEFAULT FUNCTION
var defaultFunction = function () {

    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {
            return console.log(err);
        }
        // console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        command = dataArr[0];
        subject = dataArr[1];
        console.log(command, subject);
        findSong();
    });

}

if (command === "concert-this") {
    console.log(command, subject);
    findConcert();
} else
    if (command === 'spotify-this-song') {
        findSong();
    } else
        if (command === 'movie-this') {
            findMovie();
        } else
            if (command === 'do-what-it-says') {
                defaultFunction();
            };
// Functions defined below

