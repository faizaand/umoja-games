import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatchService} from '../../../match.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Match} from '../../../data/match';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

@Component({
    selector: 'app-match-detail',
    templateUrl: './match-detail.page.html',
    styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {

    match: Match = new class implements Match {
        category: string;
        date: Timestamp;
        endDate: Timestamp;
        ground: string;
        redCards: number;
        score1: number;
        score2: number;
        team1: string;
        team2: string;
        yellowCards: number;
    };
    team1: any = {title: '', subtitle: ''};
    team2: any = {title: '', subtitle: ''};
    segment: string;

    constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private matchService: MatchService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        const matchDocument = this.firestore.doc('matches/' + id).valueChanges();
        matchDocument.subscribe(value => {
            this.match = value as Match;
            this.team1 = this.computeTeamTitles(this.match.team1);
            this.team2 = this.computeTeamTitles(this.match.team2);
            this.computeTimeString(this.match.date, this.match.endDate);
        });
    }

    segmentChanged($event) {
        const segmentId = Number($event.detail.value.substr(-1, 1));
        this.segment = segmentId ? 'rosters' : 'activity';
    }

    computeTeamTitles(team: string) {
        const teamSplit = team.split(' ');
        let title = '';
        let subtitle = '';
        if (teamSplit.length === 1) {
            title = teamSplit[0];
            subtitle = '';
        } else if (teamSplit.length === 2) {
            subtitle = teamSplit[0];
            title = teamSplit[1];
        } else {
            const part1 = teamSplit.slice(0, teamSplit.length - 2);
            const part2 = teamSplit.slice(teamSplit.length - 2);

            if (part2[1].length < 3) {
                // the last part of the name is under 3 letters so it'll probably fit
                subtitle = part1.join(' ');
                title = part2.join(' ');
            } else {
                subtitle = part1.join(' ') + ' ' + part2[0];
                title = part2[1];
            }
        }

        return {
            title, subtitle
        };
    }

    computeTimeString(matchStartTimestamp, matchEndTimestamp) {
        const matchStart = new Date(matchStartTimestamp.seconds * 1000);
        const matchEnd = matchEndTimestamp == null ? null : new Date(matchEndTimestamp * 1000);
        const now = new Date(2019, 7, 3, 15, 0, 0, 0);
        console.log(matchStart);
        console.log(matchEnd);
        console.log(now);

        /*
        if(beforeTheMatch) {
            if(today) {
                // starting at 3:30pm
            } else {
                // Sunday 3:30pm
            }
        }*/
    }

}
