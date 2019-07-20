import {Component, OnInit} from '@angular/core';
import {MatchService} from '../../match.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Match} from '../../data/match';

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

    constructor(private matchService: MatchService, private firestore: AngularFirestore) {
    }

    ngOnInit() {
        this.categories = this.matchService.getCategories();
        this.selectedCategory = this.categories[0];
        this.fetchMatches();
    }

    segmentChanged($event: CustomEvent<any>) {
        const selectedIndex = $event.detail.value.substr(-1, 1);
        this.selectedCategory = this.categories[selectedIndex];
        this.fetchMatches();
    }

    fetchMatches() {
        this.matchesCollection = this.firestore.collection('matches', ref => ref.where('category', '==', this.selectedCategory));
        this.matchesCollection.snapshotChanges().subscribe(actions => {
            this.matches = actions.map(a => {
                const data = a.payload.doc.data() as Match;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }
}
