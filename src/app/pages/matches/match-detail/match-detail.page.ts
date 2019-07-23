import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatchService} from '../../../match.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Match} from '../../../data/match';
import {computeTeamTitles, computeTimeString} from '../../../match-helper';
import {Player} from '../../../data/player';
import {Team} from '../../../data/team';

@Component({
    selector: 'app-match-detail',
    templateUrl: './match-detail.page.html',
    styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {

    match: Match = {} as any;
    team1: any = {title: '', subtitle: ''};
    team2: any = {title: '', subtitle: ''};
    segment: string;
    rosterSegment: string;
    showingRoster: Player[];

    constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private matchService: MatchService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        const matchDocument = this.firestore.doc('matches/' + id).valueChanges();
        matchDocument.subscribe(value => {
            this.match = value as Match;
            this.team1 = computeTeamTitles(this.match.team1);
            this.team2 = computeTeamTitles(this.match.team2);
            computeTimeString(this.match.date, this.match.endDate);
        });
    }

    segmentChanged($event) {
        const segmentId = Number($event.detail.value.substr(-1, 1));
        this.segment = segmentId ? 'rosters' : 'activity';
    }

    changeRoster() {
        // get the team
        const teamColl = this.firestore.collection<Player>("teams/" + this.rosterSegment + "/players").valueChanges();
        teamColl.subscribe(value => {
            if(value.length > 0) {
                const playerColl = this.firestore.collection<Player>("teams/" )
            }
        });
    }

}
