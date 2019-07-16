import { Component, OnInit } from '@angular/core';
import {MatchService} from '../../match.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  categories: string[];
  selectedCategory: string;
  matchesCollection;
  matches;

  constructor(private matchService: MatchService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.categories = this.matchService.getCategories();
    this.selectedCategory = this.categories[0];
    // this.matches = this.matchService.getMatches();
    this.matchesCollection = this.firestore.collection('matches');
    this.matches = this.matchesCollection.valueChanges();
  }

  segmentChanged($event: CustomEvent<any>) {
    const selectedIndex = $event.detail.value.substr(-1, 1);
    this.selectedCategory = this.categories[selectedIndex];
  }
}
