import {Component, OnInit} from '@angular/core';
import {Team} from '../../data/team';
import {DataService} from '../../data/data.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    followedTeams: Team[] = [];
    links: any[] = [{title: '', description: '', url: ''}];
    date = new Date();

    constructor(private db: DataService, private browser: InAppBrowser) {
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

}
