var db = require('../db');

var Tournament = {

    createTournament: function(name, callback){
        return db.query('INSERT INTO `Tournoi` (Nom) VALUES (?)', [name], callback);
    },

    setTournamentTeams: function(tournament, team, callback){
        return db.query('INSERT INTO `EquipesTournoi` (Tournoi, Equipe) VALUES (?, ?)', [tournament, team], callback);
    },

    getTournamentTeams: function (tournament, callback) {
        return db.query('SELECT `Equipe` FROM `EquipesTournoi` WHERE `Tournoi` = ?', [tournament], callback);
    }
};

module.exports = Tournament;
