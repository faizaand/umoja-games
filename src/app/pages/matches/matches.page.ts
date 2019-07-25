import {Component, OnInit} from '@angular/core';
import {categories} from '../../data/categories';
import {DataService} from '../../data/data.service';
import {Match} from '../../data/match';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

    categoryNames: string[] = categories.map(value => value.name);
    selectedCategory: string = this.categoryNames[0];
    matches: Match[];
    loading = true;

    constructor(private data: DataService) {
    }

    ngOnInit() {
        this.segmentChanged(); // run it without an event so it sets it to a default
    }

    segmentChanged() {
        this.loading = true;
        this.data.getMatchesByCategory(this.selectedCategory).then(value => {
            this.matches = [];
            value.forEach(result => {
                const data = result.data() as Match;
                this.matches.push(data);
            });
            this.loading = false;
        });
    }

}
