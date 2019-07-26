import {Component, OnInit} from '@angular/core';
import {Team} from '../../data/team';
import {DataService} from '../../data/data.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Storage} from '@ionic/storage';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    followedTeams: Team[] = [];
    links: any[] = [{title: '', description: '', url: ''}];
    date = new Date();
    clickIncrementor = 0;

    constructor(private db: DataService, private storage: Storage, private browser: InAppBrowser, private alertController: AlertController) {
    }

    ngOnInit() {
        this.db.getLinks$().subscribe(links => {
            this.links = links;
        });
    }

    ionViewWillEnter() {
        this.db.getFollowedTeams().then(teams => {
            this.followedTeams = [];
            teams.forEach(team => {
                this.db.getTeamById(team).then(teamData => {
                    const teamObj = teamData.data() as Team;
                    this.followedTeams.push(teamObj);
                });
            });
        });
    }

    link(url) {
        this.browser.create(url);
    }


    onClick() {
        this.clickIncrementor ++;
        if(this.clickIncrementor >= 10) {
            // we have a volunteer
            this.presentAlertPrompt();
        }
    }

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Umojis Only!',
            inputs: [
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Enter your volunteer password.'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Go',
                    handler: data => {
                        const pass = data.password;
                        if(pass === "Supersecretumojipassword2019") {
                            this.storage.set('umoji', true);
                            this.alertController.create({
                                header: "Welcome!",
                                message: "Please restart the app all the way (go into multitasking and close it, then reopen) to get access to Umojis Only.",
                                buttons: ['OK']
                            }).then(res => res.present());
                        } else {
                            this.alertController.create({
                                header: "Sorry :(",
                                message: "That password was incorrect.",
                                buttons: ['OK']
                            }).then(res => res.present());
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

}
