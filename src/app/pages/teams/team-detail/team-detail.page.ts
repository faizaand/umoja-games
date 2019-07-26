import {Component, OnInit} from '@angular/core';
import {Team} from '../../../data/team';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../../data/player';
import {DataService} from '../../../data/data.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.page.html',
    styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {

    team: Team = {} as any;
    players: Player[];
    selectedScreen: string = 'players';
    following: boolean = false;

    constructor(private route: ActivatedRoute, private db: DataService, private storage: AngularFireStorage) {
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
                // todo image placeholders
                const ref = this.storage.ref('thumbs/256_' + player.imageUrl + '.jpg');
                ref.getDownloadURL().subscribe(img => {
                    this.players.push({...player, imageUrl: img});
                });
            });
        });

        this.db.getFollowedTeams().then(teams => {
            teams.forEach(team => {
                if (String(id) === team) {
                    this.following = true;
                }
            });
        });
    }

    follow() {
        this.following = true;
        this.db.addFollowedTeam(String(this.team.id));
    }

    unfollow() {
        this.following = false;
        this.db.removeFollowedTeam(String(this.team.id));
    }

}
