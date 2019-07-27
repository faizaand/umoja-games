import {Component, OnInit} from '@angular/core';
import {Team} from '../../../data/team';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../../data/player';
import {DataService} from '../../../data/data.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Match} from '../../../data/match';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.page.html',
    styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {

    team: Team = {} as any;
    players: Player[];
    matches: Match[];
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
                const playerWithStats = Object.assign({}, player) as any;
                playerWithStats.appearances = 0;
                playerWithStats.goals = 0;
                playerWithStats.goalsAgainst = 0;
                playerWithStats.pog = 0;
                playerWithStats.yellowCards = 0;
                playerWithStats.redCards = 0;

                if(player.matches) {
                    Object.values(player.matches).forEach(match => {
                        playerWithStats.appearances += match.appearances;
                        playerWithStats.goals += match.goals;
                        playerWithStats.goalsAgainst += match.goalsAgainst;
                        playerWithStats.pog += match.pog;
                        playerWithStats.yellowCards += match.yellowCards;
                        playerWithStats.redCards += match.redCards;
                    });
                }

                // todo image placeholders
                const ref = this.storage.ref('thumbs/256_' + player.imageUrl + '.jpg');
                ref.getDownloadURL().subscribe(img => {
                    this.players.push({...playerWithStats, imageUrl: img});
                }, error => {
                    if(error.code === "storage/object-not-found") {
                        this.players.push({...playerWithStats, imageUrl: 'assets/profile_300.png'});
                    }
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
