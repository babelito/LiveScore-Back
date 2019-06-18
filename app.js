var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

var LoginController = require('./Login/LoginController');
app.use('/users', LoginController);

var MatchController = require('./Match/MatchController');
app.use('/match', MatchController);

var TournamentController = require('./Tournament/TournamentController');
app.use('/tournament', TournamentController);

module.exports = app;
