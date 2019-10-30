require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");

var command = process.argv[2];
var subject = process.argv.slice(3).join('+');

var findConcert = function () {
    var URL = "https://rest.bandsintown.com/artists/" + subject + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
        var concertData = response.data[0]
        var concertVenue = concertData.venue.name; 
        var venueCity = concertData.venue.city;
        var venueState = concertData.venue.region;
        var concertDate = concertData.datetime;
        var n = ('\n'); 
        console.log(`Venue Name: ${concertVenue} ${n}Venue Location: ${venueCity}, ${venueState} ${n}Concert Date: ${concertDate}`);
    });
}


var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(
    {
  id: keys.spotify.id,
  secret: keys.spotify.secret,
}
);
var findSong = function () {
    var URL = "https://api.spotify.com/v1/search/type=track&q=" + subject + "&id=" + spotify["id"]; 

axios.get(URL).then(function (response){
    console.log(URL);
    console.log(response);
})
.catch((error)=>{
    console.log(error)
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


