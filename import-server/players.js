// Players routes
const {getAll} = require('./utils');
const axios = require('axios');

module.exports.registerPlayerRoutes = function (app, db) {
    app.get('/player/count', (req, res) => count(req, res, db));
    app.get('/player/import/all', (req, res) => importAll(req, res, db));
    app.get('/player/import/:id', (req, res) => importOne(req, res, db));
};

function count(req, res, db) {
    db.collection('players').get()
        .then(snapshot => {
            console.log(snapshot.size);
        })
        .catch(reason => {
            res.send("Error " + reason);
        });
    res.sendStatus(200);
}

function importAll(req, res, db) {
    getAll('https://umojaoutreach.org/wp-json/sportspress/v2/players/')
        .then(players => {
            console.log("Retrieved listing of size " + players.length);
            players.forEach(player => {
                processPlayer(player, db);
                console.log("Processed player " + player.id);
            });
        });
}

function importOne(req, res, db) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/sportspress/v2/players/' + id)
        .then(value => {
            const data = value.data;
            processPlayer(data, db);
        });
}

function processPlayer(data, db) {
    const stats = getStatistics(data.statistics);

    const finalPlayer = {
        id: data.id,
        name: data.title.rendered,
        nationality: data.nationalities[0] || 'usa',
        team: data.current_teams[0] || 'Unknown',
        imageUrl: data.featured_media,
        jersey: data.number || 0,
        position: data.positions[0] || 'Forward',
        ...stats
    };

    db.collection('players').doc(String(finalPlayer.id)).set(finalPlayer);
    console.log(finalPlayer);
}

function getStatistics(statsArray) {
    // todo only checks first league
    // 212 - men's shield, 213 - men's cup
    // need to adjust for these
    // or do it programatically
    const keys = Object.keys(statsArray);
    if (keys.length === 0) {
        return {
            appearances: 0,
            goals: 0,
            pog: 0,
            yellowCards: 0,
            redCards: 0,
            goalsAgainst: 0
        };
    } else {
        const obj = statsArray[keys[0]];
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) continue;

            const val = obj[key];
            if (val.name === "Season") continue; // this is the guide one
            return {
                appearances: val.appearances || 0,
                goals: val.goals || 0,
                pog: val.pog || 0,
                yellowCards: val.yellowcards || 0,
                redCards: val.redcards || 0,
                goalsAgainst: val.goalsagainstaverage || 0
            };
        }
    }
}
