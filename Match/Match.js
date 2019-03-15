var db = require('../db');

var Match = {
    getTournaments: function(callback) {
        return db.query('SELECT Nom FROM Tournoi', callback);
    },

    getMatches: function(idTournament, callback) {
        return db.query('SELECT id, EquipeDom, ButDom, EquipeExt, ButExt, DATE_FORMAT(Date, "%d/%m/%Y") as Date FROM `Match` WHERE Tournoi = ?', [idTournament], callback);
    },

    getNextMatches: function (callback) {
        return db.query('SELECT id, EquipeDom, EquipeExt, DATE_FORMAT(Date, "%d/%m/%Y") as Date FROM `Match` WHERE Etat = 0', callback);
    },

    createMatch: function (home, away, referee, date, tournament, callback) {
        return db.query('INSERT INTO `Match` (EquipeDom, EquipeExt, Arbitre, Etat, Date, Tournoi) VALUES (?, ?, ?, ?, ?, ?)', [home, away, referee, 0, date, tournament], callback);
    },

    getReferees: function (callback) {
        return db.query('SELECT `Nom` FROM `Arbitre`', callback);
    },

    getTeams: function (callback) {
        return db.query('SELECT `Nom` FROM `Equipe`', callback);
    }
};

module.exports = Match;
