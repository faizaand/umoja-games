const { getAll, catMap } = require('./utils');
const axios = require('axios');

module.exports.registerTeamRoutes = function (app, db) {
    app.get('/team/import/all', (req, res) => importAll(req, res, db));
    app.get('/team/import/:id', (req, res) => importOne(req, res, db));
};

function importAll(req, res, db) {
    getAll('https://umojaoutreach.org/wp-json/sportspress/v2/teams/')
        .then(teams => {
            teams.forEach(team => {
                processTeam(team, db);
                console.log("Processed team " + team.id);
            });
        });
}

function importOne(req, res, db) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/sportspress/v2/teams/' + id)
        .then(value => {
            const data = value.data;
            processTeam(data, db);
        });
}

function processTeam(data, db) {
    const date = new Date(data.date);
    if(date.getFullYear() !== new Date().getFullYear()) {
        return {};
        // skip it if it's not current
    }

    let captain = data.content.rendered || 'Unknown';
    captain = captain.replace('<p>Team Captain: ', '')
        .replace('</p>', '')
        .replace('\n', '');
    const categories = data.leagues.map(league => catMap[league] || 'unknown');

    const finalTeam = {
        id: data.id,
        name: data.title.rendered,
        captain: captain,
        categories: categories,
    };

    db.collection('teams').doc(String(finalTeam.id)).set(finalTeam);
    console.log(finalTeam);
    return finalTeam;
}
