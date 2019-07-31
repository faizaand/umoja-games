import {Component, OnInit} from '@angular/core';
import {categories} from '../../data/categories';
import {DataService} from '../../data/data.service';
import {Match} from '../../data/match';
import * as moment from 'moment';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

    categoryNames: string[] = categories.map(value => value.name);
    selectedCategory: string = this.categoryNames[0];
    matches: Match[];
    pastMatches: Match[];
    loading = true;

    constructor(private data: DataService) {
    }

    ngOnInit() {
        this.segmentChanged();
    }

    ionViewWillEnter() {
        // reload the timings
        this.loading = true;
        if (!this.matches) {
            this.matches = [];
        }
        if(!this.pastMatches) {
            this.pastMatches = [];
        }

        const all = this.matches.concat(this.pastMatches);
        this.matches = [];
        this.pastMatches = [];

        all.forEach(result => {
            const data = result as Match;
            const now = moment();

            let m = moment(data.date);
            let adjustedMoment = moment(m).add(+data.duration, 'minutes');

            if (adjustedMoment.isBefore(now)) {
                this.pastMatches.push(data);
            } else {
                this.matches.push(data);
            }
        });

        this.matches.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        this.pastMatches.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.loading = false;
    }

    segmentChanged() {
        this.loading = true;
        this.data.getMatchesByCategory(this.selectedCategory).then(value => {
            this.matches = [];
            this.pastMatches = [];
            value.forEach(result => {
                const data = result.data() as Match;
                const now = moment();

                let m = moment(data.date);
                let adjustedMoment = moment(m).add(+data.duration, 'minutes');

                if (adjustedMoment.isBefore(now)) {
                    this.pastMatches.push(data);
                } else {
                    this.matches.push(data);
                }
            });

            this.matches.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            this.pastMatches.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            this.loading = false;
        });
    }

}
