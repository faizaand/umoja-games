const {getAll} = require('./utils');
const axios = require('axios');

module.exports.registerMediaRoutes = function (app, db) {
    app.get('/media/import/all', (req, res) => importAll(req, res, db));
    app.get('/media/import/:id', (req, res) => importOne(req, res, db));
};

function importAll(req, res, db) {
    getAll('https://umojaoutreach.org/wp-json/wp/v2/media/')
        .then(medias => {
            console.log(medias.length);
            medias.forEach(media => {
                processMedia(media, db);
                console.log("Processed media " + media.id);
            });
        });
}

function importOne(req, res, db) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/wp/v2/media/' + id)
        .then(value => {
            const data = value.data;
            processMedia(data, db);
        });
}

function processMedia(data, db) {
    const finalMedia = {
        id: data.id,
        url: data.source_url
    };

    db.collection('media').doc(String(finalMedia.id)).set(finalMedia);
    console.log(finalMedia);
    return finalMedia;
}

