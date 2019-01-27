var jwt = require('../jwt')
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/connect', function (req, res) {
    jwt.createToken(req, res);
});

module.exports = router;