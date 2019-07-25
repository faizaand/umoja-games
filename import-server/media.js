const {getAll} = require('./utils');
const axios = require('axios');
const sharp = require('sharp');
const _ = require('lodash');
const path = require('path');
const os = require('os');
const download = require('image-downloader');

module.exports.registerMediaRoutes = function (app, db, bucket) {
    app.get('/media/import/all', (req, res) => importAll(req, res, db, bucket));
    app.get('/media/import/:id', (req, res) => importOne(req, res, db, bucket));
};

function importAll(req, res, db, bucket) {
    getAll('https://umojaoutreach.org/wp-json/wp/v2/media/')
        .then(medias => {
            console.log(medias.length);
            medias.forEach(media => {
                processMedia(media, db, bucket);
                console.log("Processed media " + media.id);
            });
        });
}

function importOne(req, res, db, bucket) {
    const id = req.params.id;
    axios.get('https://umojaoutreach.org/wp-json/wp/v2/media/' + id)
        .then(value => {
            const data = value.data;
            processMedia(data, db, bucket);
        });
}

function processMedia(data, db, bucket) {
    const id = data.id;
    const thumbUrl = data.source_url;
    const contentType = data.media_type;
    const SIZES = [256, 512];

    console.log("Processing " + id);

    if(!contentType.startsWith('image')) {
        console.log('This file is not an image');
        return;
    }

    const fileName = id + "." + thumbUrl.split('\.').pop();
    console.log(fileName);
    const tempFilePath = path.join(os.tmpdir(), fileName);

    download.image({
        url: thumbUrl,
        dest: tempFilePath
    }).then(() => {
        _.each(SIZES, (size) => {
            let newFileName = `${size}_${fileName}`
            let newFileTemp = path.join(os.tmpdir(), newFileName);
            let newFilePath = `thumbs/${newFileName}`

            sharp(tempFilePath).resize(size, null).toFile(newFileTemp, (err, info) => {
                if(err) {
                    console.log("Could not resize:: " + err);
                } else {
                    bucket.upload(newFileTemp, {
                        destination: newFilePath
                    });
                    console.log("Done");
                }
            });
        });
    }).catch((err) => {
        console.log("Could not download image;;");
        console.log(err);
    });
}

