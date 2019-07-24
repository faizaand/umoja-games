import {Component, OnInit} from '@angular/core';
import {Team} from '../../data/team';
import {categories} from '../../data/categories';
import {DataService} from '../../data/data.service';
import {computeTeamTitles} from '../../match-helper';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.page.html',
    styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

    categoryNames: string[] = categories.map(value => value.name);
    selectedCategory: string = this.categoryNames[0];
    teams: Team[];

    constructor(private db: DataService) {
    }

    ngOnInit() {
        this.segmentChanged()
    }

    segmentChanged() {
        this.teams = [];
        this.db.getTeamsByCategory(this.selectedCategory).forEach(teams => {
            const teamsWithTitles = [];
            teams.forEach(team => {
                teamsWithTitles.push({...computeTeamTitles(team.name), ...team});
            });
            this.teams = teamsWithTitles;
        });
    }

}
