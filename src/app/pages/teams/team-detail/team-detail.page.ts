import {Component, OnInit} from '@angular/core';
import {Team} from '../../../data/team';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../../data/player';
import {DataService} from '../../../data/data.service';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.page.html',
    styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {

    team: Team = {} as any;
    players: Player[];
    selectedScreen: string = 'players';

    constructor(private route: ActivatedRoute, private db: DataService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.params.id;

        this.db.getTeamById(id).then(team => {
            this.team = team.data() as Team;
        });

        console.log(id);
        this.db.getPlayersByTeam$(id).subscribe(value => {
            console.log(value);
            this.players = [];
            value.forEach(player => {
                this.db.getMediaById$(player.imageUrl).subscribe(img => {
                    this.players.push({...player, imageUrl: img.url});
                });
            });
        });
    }

}
