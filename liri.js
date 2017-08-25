var request = require("request");
var keys = require("./keys.js");
var fs = require('fs');
var userCommand = process.argv[2]; //---captures either movie-this, spotify-this-song, or my-tweets----//

//----Used to capture everything after usercommand argument as own string and save it as a variable----//
var nodeArgs = process.argv;
var userQuery = "";

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    userQuery = userQuery + "+" + nodeArgs[i];
  } else {
    userQuery += nodeArgs[i];
  }
}

console.log("User requested: " + userCommand + " " + userQuery);

if (userCommand === "do-what-it-says"){
  random();
} else {
  doLiri();
}

function doLiri() {

  switch (userCommand) {
    case "movie-this":
      movie();
      break;

    case "spotify-this-song":
      spotify();
      break;

    case "my-tweets":
      tweetShow();
      break;

    case "do-what-it-says":
      random();
      break;

    default:
      liriLoad();
      break;

  }
}

function movie() {
  var request = require("request");
  if (userQuery != '') {
    userQuery = userQuery;
  } else {
    userQuery = 'Mr. Nobody';
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=40e9cece";
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {

    if (JSON.parse(body).Title === undefined) {
      var notFound = console.log("Hmmmm... Having trouble finding the movie you requested, try another movie.");
    } else if (!error && response.statusCode === 200) {

      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("Rating: " + JSON.parse(body).imdbRating);
      console.log("Country Filmed: " + JSON.parse(body).Country);

      //---------Ratings get tricky, created checks to see if and how many/types exist-----------//
      if (!JSON.parse(body).Ratings[0]) {
        console.log("Ratings: N/A");
      } else {
        for (var i = 0; i < 2; i++) {
          console.log(JSON.parse(body).Ratings[i].Source + " Rating: " + JSON.parse(body).Ratings[i].Value);
        } //--------------for loop to go through all ratings and return whatever is in object-------------//
      }

      console.log("Language: " + JSON.parse(body).Language);
      console.log('<~~~~~~~~~~~~~~~~~~~~PLOT~~~~~~~~~~~~~~~~~~~~~~~~~>');
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log('<~~~~~~~~~~~~~~~~~~~~CAST~~~~~~~~~~~~~~~~~~~~~~~~~>');
      console.log("Cast: " + JSON.parse(body).Actors);
      console.log('<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>');
      //console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      //console.log("Rotten Tomatoes: " +JSON.parse(body).Ratings[1].Value);
      //  console.log(JSON.parse(body));

      fs.appendFile('log.txt', JSON.parse(body).Title + '\r\n' + JSON.parse(body).Plot + '\r\n', function(err) {
        if (err) throw err;
        console.log('Movie logged to log.txt');
      });
    }
  });

} ///----------------end MOVIE function--------------------///

function spotify() {

  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: keys.spotifyKeys.client_Id,
    secret: keys.spotifyKeys.client_secret,
  });

  if (userQuery != '') {
    userQuery = userQuery;
  } else {
    userQuery = "Ace of Base the Sign";
  }

  spotify.search({
    type: 'track',
    query: userQuery
  }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    //console.log(data.tracks.items);
    console.log('Artist:', data.tracks.items[0].artists[0].name);
    console.log('Track:', data.tracks.items[0].name);
    console.log('Preview Link:', data.tracks.items[0].preview_url);
    console.log('Album:', data.tracks.items[0].album.name);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    fs.appendFile('log.txt', data.tracks.items[0].artists[0].name + '\r\n' + data.tracks.items[0].name + '\r\n', function(err) {
      if (err) throw err;
      console.log('Song logged to log.txt');
    });
  });

} ///--------------------End SPOTIFY function-------------------------------


function tweetShow() {

  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  var params = {
    screen_name: 'jahshwahkc',
    count: 0
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < 4; i++) { //--------------limited to three because that's what I have 4 tweets-----------//
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        fs.appendFile('log.txt', tweets[i].text + '\r\n', function(err) {
          if (err) throw err;
        });
        console.log('tweets logged to log.txt');
      }
    } else {
      console.log(error);
    }
  });
} //--------------------End Twitter Function-----------------------//

function random() {

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var output = data.split(",");

    for (var i = 0; i < output.length; i++) {
      //console.log(output[i]);
      userCommand = output[0];
      //console.log(userCommand);
      userQuery = output[1];
    //  console.log(userQuery);
    }

    doLiri(userCommand,userQuery);

  });
} ////--------------------end random function------------------------//

function liriLoad() {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~++++++++++++++++~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~+ Hi I am Liri +~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~++++++++++++++++~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~  I have a few tricks I am programmed to do--  ~~~~~~~~~");
  console.log("~~~~~~~~~~ --by inputting some simple commands ~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~   Ask me to 'spotify-this-song' and then   ~~~~~~~~~");
  console.log("~~~~~~~~~  enter any song you'd like some info on  ~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~   Ask me to 'movie-this' and then   ~~~~~~~~~~~~~");
  console.log("~~~~~  enter a movie to gather some details on the film  ~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~   Ask me 'my-tweets' and you'll see the ~~~~~~~~~~~");
  console.log("~ the very few and sad tweets of the nerd that programmed me ~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("~~~~~~~  Ask me 'do-what-it-says' and I'll see what  ~~~~~~~~~");
  console.log("~~~ random commands are in my random.txt file and do that ~~~~");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}
