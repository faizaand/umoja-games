import {Component, OnInit} from '@angular/core';
import {MatchService} from '../match.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

    teamCategories: any;
    matchList: any;
    selectedTeam: string;

    constructor(public matchService: MatchService) {
    }

    ngOnInit() {
        this.matchService.getCategories().then(value => {
            this.teamCategories = value;
            this.selectedTeam = this.teamCategories[0];
        });
        this.matchService.getMatchList().then(value => {
            console.log(value);
            this.matchList = value;
        });
    }

    segmentChanged($event) {
        // ion-sb-1
        const id = $event.detail.value.substr(-1, 1);
        this.selectedTeam = this.teamCategories[id];
    }
}
