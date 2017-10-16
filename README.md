<h2>liri-node-app</h2>

Back end Node application to request and receive queries from omdb, spotify, and twitter.

after an npm install in the console, run 'node liri' to see a list of options:

![](https://i.imgur.com/FgfdQ1K.png)

runnning "node liri movie-this" and then a name of a movie you would like information on returns info such as title, release year, plot and characters.  In addition I put a function in there to look at what different reviews are attached to the film, thne loop through and return if/and what those reviews are.

![](https://i.imgur.com/xSEISPF.png)

running "node liri spotify-this-song" and then a song title will call spotify and return inforamtion on the requested song

![](https://i.imgur.com/EO6wYsH.png)

"node liri my-tweets" will return my most recent 10 tweets, or whoever's account it is set up to track.

![](https://i.imgur.com/H1WoLwX.png)

I also have a write to file system in place where after every time liri performs a task the result is then logged to a text file for reference.

![](https://i.imgur.com/birSpev.png)
