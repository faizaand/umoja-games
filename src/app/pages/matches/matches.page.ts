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

    constructor(private data: DataService) {
    }

    ngOnInit() {
        this.segmentChanged(); // run it without an event so it sets it to a default
    }

    segmentChanged() {
        this.data.getMatchesByCategory$(this.selectedCategory).subscribe(value => this.matches = value);
    }

}
