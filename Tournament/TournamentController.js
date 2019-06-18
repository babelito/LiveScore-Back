var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Tournament = require('./Tournament');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.post('/create', function (req, res) {
    const name = req.body.name;
    const teams = req.body.teams;

    Tournament.createTournament(name, function(err,rows){
        if(err) {
            return res.status(400).send({
                success: false,
                message: 'DB connection failed'
            });
        }else {
            for (const team of teams){

                Tournament.setTournamentTeams(name, team, function(err,rows){
                    if(err) {
                        return res.status(400).send({
                            success: false,
                            message: 'DB connection failed'
                        });
                    }else {
                        return;
                    }
                });
            }

            res.status(200).send(rows);
        }
    });

});


router.get('/teams/:idTournament', function (req, res) {
    const tournament = req.params.idTournament;
    Tournament.getTournamentTeams(tournament, function(err,rows){
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


module.exports = router;

