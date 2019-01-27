var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'mysql.montpellier.epsi.fr',
    port: '5206',
    user: 'arthur.fort',
    password: 'epsi841QWC',
    database: 'LiveScore'
});

module.exports = connection;