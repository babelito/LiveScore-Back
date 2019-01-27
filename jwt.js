const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const Login = require('./Login/Login');

function createToken(req, res) {
    let privateKey = fs.readFileSync('./Keys/private.key', 'utf8');
    let username = req.body.username;
    let password = req.body.password;



    if (username && password) {

        Login.getPwd(username, password, function(err,rows){
            if(err) {
                return res.status(400).send({
                    success: false,
                    message: 'DB connection failed'
                });
            }else{
                if(rows.length > 0){
                    let token = jwt.sign({username: username}, privateKey, {algorithm: 'RS256', expiresIn: '2h'});
                    return res.status(200).send({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                }else {
                    return res.status(401).send({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
            }
        });
    } else {
        return res.status(400).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}

function checkToken(req, res, next) {
    let publicKey = fs.readFileSync('./Keys/public.key', 'utf8');
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: err,
                    message: 'Token is not valid'
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

module.exports = {
    createToken: createToken,
    checkToken: checkToken
}