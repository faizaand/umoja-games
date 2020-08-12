import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../../data/team';
import {Player} from '../../../data/player';
import {DataService} from '../../../data/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-admin-team-edit',
    templateUrl: './admin-team-edit.page.html',
    styleUrls: ['./admin-team-edit.page.scss'],
})
export class AdminTeamEditPage implements OnInit {

    team: Team;
    matchId: number;

    players = [];
    selectedPlayer: Player;

    loading = true;

    constructor(private route: ActivatedRoute, private db: DataService) {
    }

    ngOnInit() {
        this.matchId = this.route.snapshot.params.matchId;

        const teamId = this.route.snapshot.params.teamId;
        this.db.getTeamById(teamId).then(value => {
            this.team = value.data() as Team;
            this.db.getPlayersByTeam$(this.team.id).subscribe(value => {
                this.players = value;
                this.loading = false;
            });
        });
    }

    onTeamSelect() {
        this.db.getPlayersByTeam$(this.team.id).subscribe(value => {
            this.players = value;
        });
    }

    onPlayerSelect() {
        if(!this.selectedPlayer.matches[this.matchId]) {
            this.selectedPlayer.matches[this.matchId] = {
                appearances: 0,
                goals: 0,
                pog: 0,
                yellowCards: 0,
                redCards: 0,
                goalsAgainst: 0
            };
        }
    }

    step(field: string, value: any) {
        if (this.selectedPlayer[field] + value < 0) {
            return;
        }
        this.selectedPlayer.matches[this.matchId][field] = this.selectedPlayer.matches[this.matchId][field] + value;
        this.db.updatePlayer(this.selectedPlayer);
    }

}
