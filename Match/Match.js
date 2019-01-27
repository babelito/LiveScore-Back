var db = require('../db');

var Match = {
    getMatches: function(callback) {
        return db.query('SELECT id, dom.Nom as Dom, ButDom, ext.Nom as Ext, ButExt, DATE_FORMAT(Date, "%d/%m/%Y") as Date FROM `Match` INNER JOIN Equipe dom ON (EquipeDom = dom.idEquipe) INNER JOIN Equipe ext ON (EquipeExt = ext.idEquipe)', callback);
    },

    getNextMatches: function (callback) {
        return db.query('SELECT id, dom.Nom as Dom, ext.Nom as Ext, DATE_FORMAT(Date, "%d/%m/%Y") as Date FROM `Match` INNER JOIN Equipe dom ON (EquipeDom = dom.idEquipe) INNER JOIN Equipe ext ON (EquipeExt = ext.idEquipe) WHERE Etat = 0', callback);
    },

    createMatch: function (dom, ext, arbitre, date, callback) {
        return db.query('INSERT INTO `Match` (EquipeDom, EquipeExt, Arbitre, Date) VALUES (?, ?, ?, ?)', [dom, ext, arbitre, date], callback);
    },

    getArbitres: function (callback) {
        return db.query('', callback);
    }
};

module.exports = Match;