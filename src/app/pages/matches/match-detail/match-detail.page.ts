import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Match} from '../../../data/match';
import {computeTeamTitles, computeTimeString} from '../../../match-helper';
import {Player} from '../../../data/player';
import {DataService} from '../../../data/data.service';

@Component({
    selector: 'app-match-detail',
    templateUrl: './match-detail.page.html',
    styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {

    match: Match = {} as any;
    team1: any = {id: 0, title: '', subtitle: ''};
    team2: any = {id: 0, title: '', subtitle: ''};
    segment: string;
    rosterSegment: string;
    ready: boolean = false;

    constructor(private route: ActivatedRoute, private data: DataService) {
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.data.getMatchById$(id).subscribe(value => {
            this.match = value as Match;

            this.data.getTeamById(this.match.team1.id).then(value => {
                const data = value.data();
                if(data) {
                    this.team1 = {id: this.match.team1.id, ...computeTeamTitles(data.name)};
                }
            });

            this.data.getTeamById(this.match.team2.id).then(value => {
                const data = value.data();
                if(data) {
                    this.team2 = {id: this.match.team2.id, ...computeTeamTitles(data.name)};
                }
                this.ready = true;
            });
            // computeTimeString(this.match.date, this.match.endDate);
        });
    }

    segmentChanged($event) {
        const segmentId = Number($event.detail.value.substr(-1, 1));
        this.segment = segmentId ? 'rosters' : 'activity';
    }

    changeRoster() {
        // get the team
        // const teamColl = this.firestore.collection<Player>("teams/" + this.rosterSegment + "/players").valueChanges();
        // teamColl.subscribe(value => {
        //     if(value.length > 0) {
        //         const playerColl = this.firestore.collection<Player>("teams/" )
        //     }
        // });
    }

}
