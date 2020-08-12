// Matches routes
const {getAll, catMap, venueMap} = require('./utils');
const axios = require('axios');

module.exports.registerMatchRoutes = function (app, db) {
    app.get('/match/count', (req, res) => count(req, res, db));
    app.get('/match/import/all', (req, res) => importAll(req, res, db));
    app.get('/match/import/:id', (req, res) => importOne(req, res, db));

    app.get('/table/import/all', (req, res) => importAllTables(req, res, db));
    app.get('/table/import/:id', (req, res) => importOneTable(req, res, db));
};

function count(req, res, db) {
    db.collection('matches').get()
        .then(snapshot => {
            console.log(snapshot.size);
        })
        .catch(reason => {
            res.send("Error " + reason);
        });
    res.sendStatus(200);
}

function importAll(req, res, db) {
    getAll('https://umojaoutreach.org/wp-json/sportspress/v2/events/')
        .then(matches => {
            matches.forEach(match => {
                processMatch(match, db);
                console.log("Processed match " + match.id);
            });
        });
}

function importOne(req, res, db) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/sportspress/v2/events/' + id)
        .then(value => {
            const data = value.data;
            processMatch(data, db);
        });
}

function processMatch(data, db) {
    if (!data.seasons.includes(76)) {
        console.log("Skipping " + data.id + " because it's not in this season");
        return;
    }

    const teams = [data.teams[0].toString(), data.teams[1].toString()];
    const team1Stats = data.results[data.teams[0]] || {};
    const team2Stats = data.results[data.teams[1]] || {};
    const categories = data.leagues.map(league => catMap[league] || 'Unknown');
    let field = data.venues.length > 0 ? venueMap[data.venues[0]] : 'Unknown';
    field = field ? field : 'Unknown';

    const finalMatch = {
        id: data.id,
        title: data.title.rendered,
        duration: data.minutes,
        date: data.date,
        categories: categories,
        field: field,
        teams: teams,
        team1: {
            id: data.teams[0],
            firstHalf: team1Stats.firsthalf || 0,
            secondHalf: team1Stats.secondhalf || 0,
            goals: team1Stats.goals || 0,
            yellowCards: team1Stats.yellowcards || 0,
            redCards: team1Stats.redcards || 0,
            outcome: team1Stats.outcome || ''
        },
        team2: {
            id: data.teams[1],
            firstHalf: team2Stats.firsthalf || 0,
            secondHalf: team2Stats.secondhalf || 0,
            goals: team2Stats.goals || 0,
            yellowCards: team2Stats.yellowcards || 0,
            redCards: team2Stats.redcards || 0,
            outcome: team2Stats.outcome || ''
        }
    };

    console.log(finalMatch);
    db.collection('matches').doc(String(finalMatch.id)).set(finalMatch);
    return finalMatch;
}
const catMap = {
    87: "Boys' Under 12",
    86: "Boys' Under 16",
    88: "Boys' Under 8",
    91: "Girls' Under 10",
    90: "Girls' Under 14",
    172: "Girls' Under 8",
    84: "Men's Open",
    85: "Men's Over 35",
    89: "Women's Open",
    92: "Toddlers",
};

function importAllTables(req, res, db) {
    getAll('https://umojaoutreach.org/wp-json/sportspress/v2/tables/')
        .then(matches => {
            matches.forEach(match => {
                processTable(match, db);
            });
        });
}

function importOneTable(req, res, db) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/sportspress/v2/tables/' + id).then(response => {
        const data = response.data;
        processTable(data, db);
    });
}

function processTable(data, db) {
    if (!data.seasons.includes(76)) {
        return;
    }

    const tableId = data.id;
    const categories = data.leagues.map(league => catMap[league] || 'unknown');
    const title = data.title.rendered;

    const finalTeams = [];

    const teamIds = Object.keys(data.data).filter(id => id !== '0');
    teamIds.forEach(id => {
        const teamData = data.data[id];
        finalTeams.push({
            pos: teamData.pos,
            name: teamData.name,
            gamesPlayed: teamData.gamesplayed,
            wins: teamData.wins,
            losses: teamData.loss,
            draws: teamData.draw,
            points: teamData.points,
            ppg: teamData.ppg,
            gf: teamData.gf,
            gfpg: teamData.gfpg,
            ga: teamData.ga,
            gapg: teamData.gapg,
            gd: teamData.gdpg,
            gdpg: teamData.gdpg,
            cards: teamData.cards,
            cpg: teamData.cpg,
            streak: teamData.strk
        });
    });

    const finalValue = {
        id: tableId,
        categories: categories,
        title: title,
        teams: finalTeams
    };

    db.collection('tables').doc(String(tableId)).set(finalValue);
}
