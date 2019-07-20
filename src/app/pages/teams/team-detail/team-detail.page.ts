import {Component, OnInit} from '@angular/core';
import {Team} from '../../../data/team';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../../data/player';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.page.html',
    styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {

    team: Team = new class implements Team {
        captain: string;
        category: string;
        name: string;
    };
    players: Player[];
    selectedScreen: string = "players";

    constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    }

    ngOnInit() {
        const doc = this.firestore.doc('teams/' + this.route.snapshot.params.id).valueChanges();
        const playerCol = this.firestore.collection('teams/' + this.route.snapshot.params.id + '/players').valueChanges();
        doc.subscribe(value => {
            this.team = value as Team;
        });

        playerCol.subscribe(value => {
            this.players = value as Player[];
        });
    }

}
