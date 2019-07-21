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
        id: string;
        captain: string;
        category: string;
        name: string;
    };
    players: Player[];
    selectedScreen: string = 'players';

    constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    }

    ngOnInit() {
        const doc = this.firestore.doc<Team>('teams/' + this.route.snapshot.params.id);
        const playerCol = this.firestore.collection('teams/' + this.route.snapshot.params.id + '/players');

        doc.snapshotChanges().subscribe(a => {
            const data = a.payload.data();
            const id = a.payload.id;
            this.team = {id, ...data};
        });

        playerCol.snapshotChanges().subscribe(actions => {
            this.players = actions.map(a => {
                const data = a.payload.doc.data() as Player;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    }

}
