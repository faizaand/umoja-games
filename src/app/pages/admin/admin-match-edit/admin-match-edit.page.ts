import { Component, OnInit } from '@angular/core';
import {Match} from '../../../data/match';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-match-edit',
  templateUrl: './admin-match-edit.page.html',
  styleUrls: ['./admin-match-edit.page.scss'],
})
export class AdminMatchEditPage implements OnInit {

  matches: Match[];
  selectedMatch: Match;
  showTwo: boolean = false;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  getMatches(selectedField: string) {
    this.firestore.collection<Match>("matches", ref => ref.where('ground', '==', selectedField)).valueChanges()
        .subscribe(value => this.matches = value);
  }

}
