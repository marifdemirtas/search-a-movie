var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.render("index.ejs");
});

app.get('/search', function(req, res) {

    request('http://www.omdbapi.com/?apikey=thewdb&t=' + req.query.movieName, function(error, response, body) {
        if (!error) {
            var parsed = (JSON.parse(body));
            if (typeof parsed["Title"] !== 'undefined') {
                res.render('result.ejs', {
                    movieName : parsed["Title"],
                    movieRelease : parsed["Released"],
                    movieDirector : parsed["Director"],
                    movieWriter : parsed["Writer"],
                    movieActors : parsed["Actors"],
                    moviePlot : parsed["Plot"],
                    movieScore : parsed["imdbRating"],
                })
            } else {
                res.render('notfound.ejs')
            }
        } else {
            res.render('error.ejs');
        }
    });
});

app.get('*', function(req, res) {
    res.render("error.ejs")
})

app.listen(3000, function() {
    console.log("Server is on.");
});