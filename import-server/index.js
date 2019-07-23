const express = require('express');
const axios = require('axios');
var admin = require('firebase-admin');
const app = express();

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
}

var serviceAccount = require("../../umoja-games-ab076-firebase-adminsdk-dqunb-a338cacd22.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://umoja-games-ab076.firebaseio.com"
});

var db = admin.firestore();


app.get('/importMatch/:id', (req, res) => importMatch(req, res, db));
app.get('/importMatches', (req, res) => importMatches(req, res, db));
app.get('/matches', listMatches);

app.listen(3000);
function listMatches(req, res) {
    let all = db.collection('matches')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    res.sendStatus(200);
}

// for now just 100
function importMatches(req, res, db) {
    getAllMatches().then(matches => {
        matches.forEach(match => {
            processMatch(match);
            console.log("processed " + match.id);
        });
    });
}

function getAllMatches(page, size, matches) {
    page = page || 1;
    size = size || 100;
    matches = matches || [];
    return axios
        .get(`https://umojaoutreach.org/wp-json/sportspress/v2/events/?per_page=${size}&page=${page}`)
        .then(response => response.data)
        .then(rawmatches => {
            rawmatches.forEach(matche => matches.push(matche));
            if (rawmatches.length < size) {
                // All done return the compiled list.
                return matches;
            }
            // Recurse over the next set of matches by adding another promise to the chain.
            return getAllMatches(page + 1, size, matches);
        });
}

function importMatch(req, res, db) {
    const id = req.params.id;

    axios.get('https://umojaoutreach.org/wp-json/sportspress/v2/events/' + id)
        .then(value => {
            const data = value.data;
            res.send(JSON.stringify(processMatch(data)));
        })
        .catch(reason => {
            console.log(reason);
            return res.send(reason);
        });
}

function processMatch(data) {
    const ret = [];
    ret['id'] = data.id;
    ret['title'] = data.title.rendered;
    ret['duration'] = data.minutes;
    ret['date'] = admin.firestore.Timestamp.fromDate(new Date(data.date));
    ret['team1'] = data.teams[0];
    ret['team2'] = data.teams[1];
    ret['category'] = data.leagues[0] ? catMap[data.leagues[0]] ? catMap[data.leagues[0]] : 'none' : 'none';

    const team1Results = data.results[ret['team1']];
    ret['1_firsthalf'] = team1Results.firsthalf ? Number(team1Results.firsthalf) : 0;
    ret['1_secondhalf'] = team1Results.secondhalf ? Number(team1Results.secondhalf) : 0;
    ret['1_goals'] = team1Results.goals ? Number(team1Results.goals) : 0;
    ret['1_yellowcards'] = team1Results.yellowcards ? Number(team1Results.yellowcards) : 0;
    ret['1_redcards'] = team1Results.redcards ? Number(team1Results.redcards) : 0;
    ret['1_outcome'] = team1Results.outcome ? team1Results.outcome[0] : '';
    //
    const team2Results = data.results[ret['team2']];
    ret['2_firsthalf'] = team2Results.firsthalf ? Number(team2Results.firsthalf) : 0;
    ret['2_secondhalf'] = team2Results.secondhalf ? Number(team2Results.secondhalf) : 0;
    ret['2_goals'] = team2Results.goals ? Number(team2Results.goals) : 0;
    ret['2_yellowcards'] = team2Results.yellowcards ? Number(team2Results.yellowcards) : 0;
    ret['2_redcards'] = team2Results.redcards ? Number(team2Results.redcards) : 0;
    ret['2_outcome'] = team2Results.outcome ? team2Results.outcome[0] : '';

    console.log(Object.assign({}, ret));
    db.collection('matches').doc(String(ret['id'])).set(Object.assign({}, ret));
    return ret;
}
