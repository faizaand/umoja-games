import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../../data/player';
import {DataService} from '../../../data/data.service';

@Component({
    selector: 'app-player-standings',
    templateUrl: './player-standings.page.html',
    styleUrls: ['./player-standings.page.scss'],
})
export class PlayerStandingsPage implements OnInit {

    category;
    players: Player[];
    tabs = ['Scoring Leaders', 'Goalie Leaders', 'Player of Game'];
    selectedTab = this.tabs[0];
    loading = true;

    constructor(private route: ActivatedRoute, private db: DataService) {
    }

    ngOnInit() {
        this.category = this.route.snapshot.params.category;
        this.db.getPlayersByCategory$(this.category).subscribe(value => {
            this.players = [];
            value.forEach(player => {
                const playerWithStats = Object.assign({}, player) as any;
                playerWithStats.appearances = 0;
                playerWithStats.goals = 0;
                playerWithStats.goalsAgainst = 0;
                playerWithStats.pog = 0;

                if (player.matches) {
                    Object.values(player.matches).forEach(match => {
                        playerWithStats.appearances += match.appearances;
                        playerWithStats.goals += match.goals;
                        playerWithStats.goalsAgainst += match.goalsAgainst;
                        playerWithStats.pog += match.pog;
                    });
                }

                if(player.teams) {
                    player.teams.forEach(team => {
                        if(team !== 0) playerWithStats.teamId = team;
                    })
                }

                this.players.push(playerWithStats);

                this.resort();
            });
        });
    }

    // sorts the player list according to the selected tab
    resort() {
        this.loading = true;
        setTimeout(() => {
            this.players.sort((a, b) => {
                if(this.selectedTab === 'Scoring Leaders') {
                    // @ts-ignore
                    return b.goals - a.goals;
                } else if(this.selectedTab === 'Goalie Leaders') {
                    // @ts-ignore
                    return b.goalsAgainst - a.goalsAgainst;
                } else if(this.selectedTab === 'Player of Game') {
                    // @ts-ignore
                    return b.pog - a.pog;
                }
            });
            this.loading = false;
        }, 0);
    }

}
