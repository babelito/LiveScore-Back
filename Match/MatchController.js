var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Match = require('./Match');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/all', function (req, res) {
    Match.getMatches(function(err,rows){
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

router.put('/create', function (req, res) {
    const dom = req.body.dom;
    const ext = req.body.ext;
    const arbitre = req.body.arbitre;
    const date = req.body.date;
    Match.createMatch(dom, ext, arbitre, date, function(err,rows){
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
    Match.getArbitres(function(err,rows){
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