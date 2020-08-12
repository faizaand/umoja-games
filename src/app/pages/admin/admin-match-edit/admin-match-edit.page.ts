import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../data/data.service';
import {Match} from '../../../data/match';
import {Team} from '../../../data/team';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-admin-match-edit',
    templateUrl: './admin-match-edit.page.html',
    styleUrls: ['./admin-match-edit.page.scss'],
})
export class AdminMatchEditPage implements OnInit {

    fields = [
        'Field 1A',
        'Field 1B',
        'Field 2A',
        'Field 2B',
        'Field 3A',
        'Field 3B',
        'Field 4A',
        'Field 4B',
        'Outdoor A',
        'Outdoor B',
    ];
    selectedField;

    matches = [];
    selectedMatch: Match;
    team1: Team;
    team2: Team;


    constructor(private db: DataService, private alert: AlertController) {
    }

    ngOnInit() {
    }

    onFieldSelect() {
        this.db.getMatchesByField$(this.selectedField).subscribe(value => {
            this.matches = value;
            this.matches.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            });
        });
    }

    onMatchSelect() {
        this.db.getTeamById(this.selectedMatch.team1.id).then(value => {
            this.team1 = value.data() as Team;
        });

        this.db.getTeamById(this.selectedMatch.team2.id).then(value => {
            this.team2 = value.data() as Team;
        });
    }

    step(team: string, field: string, value: any) {
        if(this.selectedMatch[team][field] + value < 0) return;
        this.selectedMatch[team][field] = this.selectedMatch[team][field] + value;

        // todo updateMatch makes selectedMatch disappear
        this.selectedMatch.team1.goals = this.selectedMatch.team1.firstHalf + this.selectedMatch.team1.secondHalf;
        this.selectedMatch.team2.goals = this.selectedMatch.team2.firstHalf + this.selectedMatch.team2.secondHalf;
        this.db.updateMatch(this.selectedMatch);
    }

    crownWinner(team: string = '') {
        if(team === '') {
            // reset
            this.selectedMatch['team1']['outcome'] = '';
            this.selectedMatch['team2']['outcome'] = '';
            return;
        }

        this.presentAlert(() => {
            if(team === 'team1') {
                this.selectedMatch['team1']['outcome'] = 'win';
                this.selectedMatch['team2']['outcome'] = 'lose';
            } else {
                this.selectedMatch['team2']['outcome'] = 'win';
                this.selectedMatch['team1']['outcome'] = 'lose';
            }

            const m = Object.assign({}, this.selectedMatch);
            this.db.updateMatch(m);
        });
    }

    async presentAlert(then) {
        const alert = await this.alert.create({
            header: 'Be careful!',
            message: 'Once you declare a winner, everyone who follows this team will be notified of the win. Pressing reset will not undo these messages. Are you sure this is the winner?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Yep, do it',
                    handler: then
                }
            ]
        });

        await alert.present();
    }
}
