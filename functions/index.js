const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');
const {getAll, catMap, venueMap} = require('./utils');

admin.initializeApp();

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
const gmailEmail = "umojaregis@gmail.com";
const gmailPassword = "FutureisNow2019!";
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

// send an email to games@umojaoutreach.org when a check-in form is stored
exports.sendCheckInMail = functions.firestore.document('registrations/{id}').onCreate(async snapshot => {

    const defaultBucket = admin.storage().bucket();
    const file = defaultBucket.file(snapshot.data().idPhoto);
    const idPhotoUrl = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2025'
    });

    const file2 = defaultBucket.file(snapshot.data().playerPhoto);
    const playerPhotoUrl = await file2.getSignedUrl({
        action: 'read',
        expires: '03-17-2025'
    });

    console.log(idPhotoUrl);
    console.log(playerPhotoUrl);

    let body = [];
    for (const key in snapshot.data()) {
        if (key === "idPhoto" || key === "playerPhoto") continue;
        body.push('<b>' + key + '</b> -- ' + snapshot.data()[key]);
    }
    body.push('<img src="' + idPhotoUrl + '" alt="id photo">');
    body.push('<img src="' + playerPhotoUrl + '" alt="player photo">');
    // body.push('<b>id photo url</b> ' + idPhotoUrl);
    // body.push('<b>player photo url</b> ' + playerPhotoUrl);

    const mailOptions = {
        from: 'Umoja Check-Ins <umojaregis@gmail.com>',
        to: 'games@umojaoutreach.org',
        subject: 'Check In for ' + snapshot.data().name, // email subject
        html: body.join("<br/>"),
    };

    // returning result
    mailTransport.sendMail(mailOptions);
    return null;
});

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

const db = admin.firestore();

// build multiple CRUD interfaces:
app.get('/table/import/all', (req, res) => importAllTables(req, res, db));
app.get('/table/import/:id', (req, res) => importOneTable(req, res, db));
app.get('/player/import/jerseys/:id', (req, res) => importJerseys(req, res, db));

// Expose Express API as a single Cloud Function:
exports.data = functions.https.onRequest(app);

function importAllTables(req, res, db) {
    getAll('https://umojaoutreach.org/wp-json/sportspress/v2/tables/')
        .then(matches => {
            matches.forEach(match => {
                processTable(match, db);
            });
            res.sendStatus(200);
        });
}

function importOneTable(req, res, db) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/sportspress/v2/tables/' + id).then(response => {
        const data = response.data;
        processTable(data, db);
        res.sendStatus(200);
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

    db.doc('/tables/' + String(tableId)).set(finalValue);
}

function importJerseys(req, res, db) {
    if(req.params.id !== 'all') {
        axios.get('https://umojaoutreach.org/wp-json/sportspress/v2/players/' + req.params.id).then(response => {
            const data = response.data;
            if (!data.seasons || data.seasons[0] !== 76) {
                // console.log("Skipping " + data.id + " because it's not from this season");
                return;
            }

            let position = 'Unknown';
            const posId = data.positions[0];
            if (posId === 61) position = "Defender";
            else if (posId === 68) position = "Forward";
            else if (posId === 59) position = "Goalkeeper";
            else if (posId === 214) position = "Midfielder";

            const number = data.number || 0;

            const player = {
                jersey: number,
                position: position
            };

            db.doc('/players/' + String(data.id)).update(player);
            res.sendStatus(200);
        });

    } else {
        getAll('https://umojaoutreach.org/wp-json/sportspress/v2/players/')
            .then(players => {
                players.forEach(data => {
                    if (!data.seasons || data.seasons[0] !== 76) {
                        // console.log("Skipping " + data.id + " because it's not from this season");
                        return;
                    }

                    let position = 'Unknown';
                    const posId = data.positions[0];
                    if (posId === 61) position = "Defender";
                    else if (posId === 68) position = "Forward";
                    else if (posId === 59) position = "Goalkeeper";
                    else if (posId === 214) position = "Midfielder";

                    const number = data.number || 0;

                    const player = {
                        jersey: number,
                        position: position
                    };

                    db.doc('/players/' + String(data.id)).update(player);
                });
                res.sendStatus(200);
            });
    }
}
