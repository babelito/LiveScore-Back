var db = require('../db');

var Login = {
    getPwd: function(username, password, callback) {
        return db.query('SELECT * FROM User WHERE login = ? AND password = ?', [username, password], callback);
    }
}

module.exports = Login;