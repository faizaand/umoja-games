import { Component, OnInit } from '@angular/core';
import {Player} from '../../../data/player';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.page.html',
  styleUrls: ['./player-detail.page.scss'],
})
export class PlayerDetailPage implements OnInit {

  teamId: string;
  player: Player = {} as any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.params.id;
    const playerId = this.route.snapshot.params.playerId;
    const playerDoc = this.firestore.doc<Player>('teams/' + this.teamId + '/players/' + playerId);

    playerDoc.valueChanges().subscribe(value => {
      this.player = value as Player;
    });
  }

}
