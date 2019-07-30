const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
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
    body.push('<img src="' + idPhotoUrl +'" alt="id photo">');
    body.push('<img src="' + playerPhotoUrl +'" alt="player photo">');
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
