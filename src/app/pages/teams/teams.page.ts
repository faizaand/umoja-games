import {Component, OnInit} from '@angular/core';
import {Team} from '../../data/team';
import {MatchService} from '../../match.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {categories} from '../../data/categories';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.page.html',
    styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

    categoryNames: string[] = categories.map(value => value.name);
    selectedCategory: string = this.categoryNames[0];
    teams: Team[];

    constructor(private matchService: MatchService, private firestore: AngularFirestore) {
    }

    ngOnInit() {
        this.fetchTeams();
    }

    segmentChanged($event: CustomEvent<any>) {
        const selectedIndex = $event.detail.value.substr(-1, 1);
        this.selectedCategory = this.categoryNames[selectedIndex];
    }

    fetchTeams() {
        const teamsCollection = this.firestore.collection('teams');
        teamsCollection.snapshotChanges().subscribe(actions => {
            this.teams = actions.map(a => {
                const data = a.payload.doc.data() as Team;
                const id = a.payload.doc.id;
                return {id, ...data, ...this.computeTeamTitles(data.name)};
            });
        });
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
