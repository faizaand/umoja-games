const express = require('express');
const app = express();

const admin = require('firebase-admin');
const serviceAccount = require("../../umoja-games-ab076-firebase-adminsdk-dqunb-a338cacd22.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://umoja-games-ab076.firebaseio.com",
    storageBucket: "umoja-games-ab076.appspot.com",
});

const db = admin.firestore();
var bucket = admin.storage();

const {registerMatchRoutes} = require('./matches');
registerMatchRoutes(app, db);

const { registerTeamRoutes } = require('./teams');
registerTeamRoutes(app, db);

const { registerPlayerRoutes } = require('./players');
registerPlayerRoutes(app, db);

const { registerMediaRoutes } = require('./media');
registerMediaRoutes(app, db, bucket);

app.listen(3000, () => {
    console.log('Umoja Games Sportspress Import Server');
    console.log('Copyright (C) 2019 Faizaan Datoo and Umoja Outreach Foundation. All rights reserved.');
    console.log('Server is now listening for requests...');
});
