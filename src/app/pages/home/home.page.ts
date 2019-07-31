import {Component, OnInit} from '@angular/core';
import {Team} from '../../data/team';
import {DataService} from '../../data/data.service';
import {Storage} from '@ionic/storage';
import {AlertController, Events} from '@ionic/angular';

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
    loadingFollows = true;

    constructor(private db: DataService, private storage: Storage, private alertController: AlertController, private events: Events) {
    }

    ngOnInit() {
        this.db.getLinks$().subscribe(links => {
            this.links = links;
        });
    }

    ionViewWillEnter() {
        this.loadingFollows = true;
        let loadingFollowsCounter = 0;
        let loadingFollowsMax = 0;
        this.db.getFollowedTeams().then(teams => {
            this.followedTeams = [];
            loadingFollowsMax = teams.length;
            if(loadingFollowsMax === 0) {
                this.loadingFollows = false;
            } else {
                teams.forEach(team => {
                    this.db.getTeamById(team).then(teamData => {
                        const teamObj = teamData.data() as Team;
                        this.followedTeams.push(teamObj);
                        loadingFollowsCounter++;
                        if (loadingFollowsCounter === loadingFollowsMax) {
                            this.loadingFollows = false;
                        }
                    });
                });
            }
        });
    }

    onClick() {
        this.clickIncrementor++;
        if (this.clickIncrementor >= 10) {
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
                        if (pass === 'Umoji$2019') {
                            this.storage.set('umoji', true);
                            this.events.publish('umoji:allow'); // notify the tabs that we can show admin now
                            this.alertController.create({
                                header: 'Welcome!',
                                message: 'Thank you for volunteering. The admin tab is now available below.',
                                buttons: ['OK']
                            }).then(res => res.present());
                        } else {
                            this.alertController.create({
                                header: 'Sorry :(',
                                message: 'That password was incorrect.',
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
