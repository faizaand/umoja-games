import {Component, OnInit} from '@angular/core';
import {MatchService} from '../../match.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Match} from '../../data/match';
import {categories} from '../../data/categories';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

    categoryNames: string[] = categories.map(value => value.name);
    selectedCategory: string = this.categoryNames[0];
    matchesCollection;
    matches;

    constructor(private matchService: MatchService, private firestore: AngularFirestore) {
    }

    ngOnInit() {
        this.fetchMatches();
    }

    segmentChanged($event: CustomEvent<any>) {
        const selectedIndex = $event.detail.value.substr(-1, 1);
        this.selectedCategory = this.categoryNames[selectedIndex];
    }

    fetchMatches() {
        console.log(this.selectedCategory);
        this.matchesCollection = this.firestore.collection('matches');
        this.matchesCollection.snapshotChanges().subscribe(actions => {
            this.matches = actions.map(a => {
                const data = a.payload.doc.data() as Match;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }
}
