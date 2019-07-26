const {getAll} = require('./utils');
const axios = require('axios');
const sharp = require('sharp');
const _ = require('lodash');
const path = require('path');
const os = require('os');
const fs = require('fs');
const http = require('http');
const https = require('https');

module.exports.registerMediaRoutes = function (app, db, bucket) {
    app.get('/media/import/all', (req, res) => importAll(req, res, db, bucket));
    app.get('/media/import/:id', (req, res) => importOne(req, res, db, bucket));
};

function importAll(req, res, db, storage) {
    storage.bucket().getFiles().then(files => {
        const fileNames = files[0].map(file => file.name.split("/").pop().split("\.")[0]);
        console.log(fileNames);
        getAll('https://umojaoutreach.org/wp-json/wp/v2/media/?_embed', 1, 100, [], true)
            .then(medias => {
                console.log(medias.length);
                medias.forEach(media => {
                    processMedia(media, db, storage, fileNames);
                    console.log("Processed media " + media.id);
                });
            });
    });
}

function importOne(req, res, db, bucket) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/wp/v2/media/' + id + '?_embed')
        .then(value => {
            const data = value.data;
            processMedia(data, db, bucket);
        });
}

function download(url, image_path, callback) {
    const httpAgent = new http.Agent({keepAlive: true});
    const httpsAgent = new https.Agent({keepAlive: true});
    axios({
        url,
        responseType: 'stream',
        httpAgent: httpAgent,
        httpsAgent: httpsAgent
    }).then(
        response =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(image_path))
                    .on('finish', () => callback())
                    .on('error', e => reject(e));
            }),
    ).catch(reason => {
        console.log("reason");
    });
}

function processMedia(data, db, storage, files) {
    const id = data.featured_media;
    console.log(data);
    const thumbUrl300 = data['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
    const thumbUrl150 = data['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
    console.log(thumbUrl300);
    console.log(thumbUrl150);
    return;

    const bucket = storage.bucket();

    console.log("Processing " + id);

    // check if it exists
    const name = '300_' + id;
    if (_.includes(files, name)) {
        // skip it, we already have it
        console.log("Skipping # " + id);
    }
    // doesn't exist

    let fileName = id + "." + thumbUrl300.split('\.').pop();
    console.log(fileName);
    let tempFilePath = path.join(os.tmpdir(), fileName);

    download(thumbUrl300,
        tempFilePath,
        () => {
            bucket.upload(tempFilePath, {
                destination: 'thumbs/300_' + fileName + '.jpg'
            });
        });

    fileName = id + "." + thumbUrl150.split('\.').pop();
    console.log(fileName);
    tempFilePath = path.join(os.tmpdir(), fileName);

    download(thumbUrl150,
        tempFilePath,
        () => {
            bucket.upload(tempFilePath, {
                destination: 'thumbs/150_' + fileName + '.jpg'
            });
        });
}

