import {Component, Input, OnInit} from '@angular/core';
import {computeTeamTitles, computeTimeString} from '../../match-helper';
import {DataService} from '../../data/data.service';
import * as moment from 'moment';

@Component({
    selector: 'app-match-list-card',
    templateUrl: './match-list-card.component.html',
    styleUrls: ['./match-list-card.component.scss'],

})
export class MatchListCardComponent implements OnInit {

    @Input() public match;
    dateString: string;
    team1: any = {title: '', subtitle: ''};
    team2: any = {title: '', subtitle: ''};
    loading = true;

    constructor(private data: DataService) {
    }

    ngOnInit() {
        this.data.getMatchById$(this.match.id).subscribe(value => {
            this.match = value;

            // build the date string
            this.computeTimes();

            this.data.getTeamById(this.match.team1.id).then(value => {
                const data = value.data();
                if(data) {
                    this.team1 = computeTeamTitles(data.name);
                }
            });

            this.data.getTeamById(this.match.team2.id).then(value => {
                const data = value.data();
                if(data) {
                    this.team2 = computeTeamTitles(data.name);
                }
                this.loading = false;
            });
        });
        // computeTimeString(this.match.date, this.match.endDate);
    }

    ionViewWillEnter() {
        this.computeTimes();
    }

    computeTimes() {
        const matchMoment = moment(this.match.date);
        this.match.momentDate = matchMoment.calendar(moment());
    }

}
