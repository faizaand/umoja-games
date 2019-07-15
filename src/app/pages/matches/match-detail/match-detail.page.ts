import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatchService} from '../../../match.service';

@Component({
    selector: 'app-match-detail',
    templateUrl: './match-detail.page.html',
    styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {

    match: any;
    team1: any;
    team2: any;
    segment: string;
    activityLoading = false;

    constructor(private route: ActivatedRoute, private matchService: MatchService) {
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.match = this.matchService.getMatchById(id);
        this.team1 = this.computeTeamTitles(this.match.team1);
        this.team2 = this.computeTeamTitles(this.match.team2);
    }

    segmentChanged($event) {
        const segmentId = Number($event.detail.value.substr(-1, 1));
        this.segment = segmentId ? 'rosters' : 'activity';
    }

    computeTeamTitles(team: string) {
        const teamSplit = team.split(' ');
        let title = '';
        let subtitle = '';
        if (teamSplit.length === 1) {
            title = teamSplit[0];
            subtitle = '';
        } else if (teamSplit.length === 2) {
            subtitle = teamSplit[0];
            title = teamSplit[1];
        } else {
            const part1 = teamSplit.slice(0, teamSplit.length - 2);
            const part2 = teamSplit.slice(teamSplit.length - 2);

            if (part2[1].length < 3) {
                // the last part of the name is under 3 letters so it'll probably fit
                subtitle = part1.join(' ');
                title = part2.join(' ');
            } else {
                subtitle = part1.join(' ') + ' ' + part2[0];
                title = part2[1];
            }
        }

        return {
            title, subtitle
        };
    }

}
