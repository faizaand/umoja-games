import {Component, Input, OnInit} from '@angular/core';
import {computeTeamTitles, computeTimeString} from '../../match-helper';

@Component({
    selector: 'app-match-list-card',
    templateUrl: './match-list-card.component.html',
    styleUrls: ['./match-list-card.component.scss'],

})
export class MatchListCardComponent implements OnInit {

    @Input() public match;
    team1: any = {title: '', subtitle: ''};
    team2: any = {title: '', subtitle: ''};

    constructor() {
    }

    ngOnInit() {
        this.team1 = computeTeamTitles(this.match.team1);
        this.team2 = computeTeamTitles(this.match.team2);
        computeTimeString(this.match.date, this.match.endDate);
    }

}
