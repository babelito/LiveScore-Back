var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Match = require('./Match');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/matches/:idTournament', function (req, res) {
    const tournament = req.params.idTournament;
    Match.getMatches(tournament, function(err,rows){
        if(err) {
            return res.status(400).send({
                success: false,
                message: 'DB connection failed'
            });
        }else {
            return res.status(200).send(rows);
        }
    });
});

router.get('/next', function (req, res) {
    Match.getNextMatches(function(err,rows){
        if(err) {
            return res.status(400).send({
                success: false,
                message: 'DB connection failed'
            });
        }else {
            return res.status(200).send(rows);
        }
    });
});

router.get('/tournaments', function (req, res) {
    Match.getTournaments(function(err,rows){
        if(err) {
            return res.status(400).send({
                success: false,
                message: 'DB connection failed'
            });
        }else {
            return res.status(200).send(rows);
        }
    });
});

router.post('/create', function (req, res) {
    const home = req.body.home;
    const away = req.body.away;
    const referee = req.body.referee;
    const date = req.body.date;
    const tournament = req.body.tournament;
    console.log(req.body);
    Match.createMatch(home, away, referee, date, tournament, function(err,rows){
        if(err) {
            return res.status(400).send({
                success: false,
                message: 'DB connection failed'
            });
        }else {
            return res.status(200).send(rows);
        }
    });
});

router.get('/info', function (req, res) {
    let Info = {teams: [], referees: []};

    let promise = new Promise(function(resolve, reject) {
        Match.getTeams(function(err,rows){
            if(err) {
                return res.status(400).send({
                    success: false,
                    message: 'DB connection failed'
                });
            }else {
                Info.teams = rows;
                resolve('ok');
            }
        });
    });

    promise.then(function() {
        Match.getReferees(function(err,rows){
            if(err) {
                return res.status(400).send({
                    success: false,
                    message: 'DB connection failed'
                });
            }else {
                Info.referees= rows;
                return res.status(200).send(Info);
            }
        });
    });
});

module.exports = router;

