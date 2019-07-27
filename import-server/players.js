// Players routes
const {getAll} = require('./utils');
const axios = require('axios');
const _ = require('lodash');

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
    // getAll('https://umojaoutreach.org/wp-json/sportspress/v2/players/?_embed', 1, 10, [], true)
    //     .then(players => {
    //         console.log("Retrieved listing of size " + players.length);
    //             players.forEach(player => {
    //                 processPlayer(player, db);
    //                 console.log("Processed player " + player.id);
    //             });
    //     });
    db.collection('players').where('imageUrl', '==', 'none').get().then(snapshot => {
        snapshot.forEach(player => {
            let id = player.data().id;
            _.delay(() => axios({
                method: 'get',
                url: 'https://umojaoutreach.org/wp-json/sportspress/v2/players/' + id + '?_embed',
                validateStatus: () => {
                    return true; // I'm always returning true, you may want to do it depending on the status received
                },
            }).then(value => {
                    const data = value.data;
                    processPlayer(data, db);
                }).catch(reason => {
                console.log(reason);
            }), 2000);
        });
    });
}

function importOne(req, res, db) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/sportspress/v2/players/' + id + '?_embed')
        .then(value => {
            const data = value.data;
            processPlayer(data, db);
        });
}

function processPlayer(data, db) {
    if(data.seasons[0] !== 76) {
        console.log("Skipping " + data.id + " because it's not from this season");
        return;
    }
    const teams = data.current_teams.map(team => team.toString());
    console.log("Processing " + data.id);
    let imageUrl = "none";
    if (data['_embedded'] && data['_embedded']['wp:featuredmedia'] && data['_embedded']['wp:featuredmedia'][0].media_details.sizes.thumbnail) {
        imageUrl = data['_embedded']['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
    }

    const finalPlayer = {
        id: data.id,
        name: data.title.rendered,
        nationality: data.nationalities[0] || 'usa',
        teams: teams || ['Unknown'],
        imageUrl: imageUrl,
        jersey: data.number || 0,
        position: data.positions[0] || 'Forward',
        matches: {
            "init": {
                appearances: 0,
                goals: 0,
                pog: 0,
                yellowCards: 0,
                redCards: 0,
                goalsAgainst: 0
            }
        }
    };

    db.collection('players').doc(String(finalPlayer.id)).set(finalPlayer);
    console.log(finalPlayer);
}

//
// function getStatistics(statsArray) {
//     // todo only checks first league
//     // 212 - men's shield, 213 - men's cup
//     // need to adjust for these
//     // or do it programatically
//     const keys = Object.keys(statsArray);
//     if (keys.length === 0) {
//         return {
//             appearances: 0,
//             goals: 0,
//             pog: 0,
//             yellowCards: 0,
//             redCards: 0,
//             goalsAgainst: 0
//         };
//     } else {
//         const obj = statsArray[keys[0]];
//         if(obj.length === 1) {
//             // we only have the guide one so let's return nil
//             return {
//                 appearances: 0,
//                 goals: 0,
//                 pog: 0,
//                 yellowCards: 0,
//                 redCards: 0,
//                 goalsAgainst: 0
//             };
//         }
//         for (const key in obj) {
//             if (!obj.hasOwnProperty(key)) continue;
//
//             const val = obj[key];
//             if (val.name === "Season") continue; // this is the guide one
//             return {
//                 appearances: val.appearances || 0,
//                 goals: val.goals || 0,
//                 pog: val.pog || 0,
//                 yellowCards: val.yellowcards || 0,
//                 redCards: val.redcards || 0,
//                 goalsAgainst: val.goalsagainstaverage || 0
//             };
//         }
//     }
// }
