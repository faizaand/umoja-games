import {Component, OnInit} from '@angular/core';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {AlertController} from '@ionic/angular';
import {DataService} from '../../../data/data.service';
import {categories} from '../../../data/categories';
import {Team} from '../../../data/team';

@Component({
    selector: 'app-admin-check-in',
    templateUrl: './admin-check-in.page.html',
    styleUrls: ['./admin-check-in.page.scss'],
})
export class AdminCheckInPage implements OnInit {

    categorizedTeams;
    checkInForm = {
        name: '',
        category: '',
        team: '',
        email: '',
        phone: '',
        dob: '',
        idPhoto: '',
        playerPhoto: '',
    };
    teams: string[] = [];

    constructor(private camera: Camera, private email: EmailComposer, private data: DataService, private alert: AlertController) {
    }

    ngOnInit() {
        this.categorizedTeams = categories.map(value => value.name);
    }

    categorySelected() {
        this.data.getTeamsByCategory(this.checkInForm.category).forEach(teams => {
            this.teams = teams.map(team => team.name);
        });
    }


    takeIdPhoto() {
        const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
        };

        this.camera.getPicture(options).then((imageData) => {
            this.checkInForm.idPhoto = imageData;
        }, (err) => {
            // Handle error
            this.presentAlert('Couldn\'t take picture', 'Something went wrong when we tried taking a photo. Check your app permissions in Settings.', err);
        });
    }

    takePlayerPhoto() {
        const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
        };

        this.camera.getPicture(options).then((imageData) => {
            this.checkInForm.playerPhoto = imageData;
        }, (err) => {
            // Handle error
            this.presentAlert('Couldn\'t take picture', 'Something went wrong when we tried taking a photo. Check your app permissions in Settings.', err);
        });
    }

    dobSelected($event) {
        $event.preventDefault();
        const d = new Date($event.target.value);
        this.checkInForm.dob = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
        console.log(this.checkInForm.dob);
    }

    submit() {
        let body = [];
        for (const key in this.checkInForm) {
            if(key === "idPhoto" || key === "playerPhoto") continue;
            body.push('<b>' + key + '</b> -- ' + this.checkInForm[key]);
        }

        let email = {
            to: 'games@umojaoutreach.org',
            attachments: [
                this.checkInForm.idPhoto,
                this.checkInForm.playerPhoto,
            ],
            subject: 'Check in - ' + this.checkInForm.name,
            body: body.join('<br>'),
            isHtml: true
        };

        this.presentAlertConfirmMail(email);
    }

    async presentAlert(header, subHeader, message, buttons = ['OK']) {
        const alert = await this.alert.create({
            header, subHeader, message, buttons
        });
        await alert.present();
    }

    async presentAlertConfirmMail(email) {
        const alert = await this.alert.create({
            header: 'Here we go!',
            message: 'Everything looks good. We\'re about to take you to your phone\'s email app with all the information prefilled. All you need to do is press send. Ready?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Let\'s do this',
                    handler: () => {
                        this.email.open(email);
                    }
                }
            ]
        });

        await alert.present();
    }
}
