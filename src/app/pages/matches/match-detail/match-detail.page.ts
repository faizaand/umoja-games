import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../../../data/match';
import {computeTeamTitles} from '../../../match-helper';
import {DataService} from '../../../data/data.service';
import {Player} from '../../../data/player';
import * as moment from 'moment';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-match-detail',
    templateUrl: './match-detail.page.html',
    styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {

    match: Match = {} as any;
    team1: any = {id: 0, title: '', subtitle: ''};
    team2: any = {id: 0, title: '', subtitle: ''};
    team1Players: Player[];
    team2Players: Player[];
    selectedRoster: Player[];
    timeString: string  = '';
    rosterSegment: string = 'team1';

    ready: boolean = false;

    constructor(private route: ActivatedRoute, private data: DataService, private storage: AngularFireStorage) {
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.data.getMatchById$(id).subscribe(value => {
            this.match = value as Match;
            this.timeString = moment(this.match.date).calendar();

            this.data.getTeamById(this.match.team1.id).then(value => {
                const data = value.data();
                if(data) {
                    this.team1 = {id: this.match.team1.id, ...computeTeamTitles(data.name)};
                    this.rosterSegment = this.team1.id;


                    this.data.getPlayersByTeam$(this.team1.id).subscribe(value => {
                        this.team1Players = value;
                        // value.forEach(player => {
                        //     // todo image placeholders
                        //     const ref = this.storage.ref('thumbs/256_' + player.imageUrl + '.jpg');
                        //     ref.getDownloadURL().subscribe(img => {
                        //         this.team1Players.push({...player, imageUrl: img});
                        //     }, error => {
                        //         if(error.code === "storage/object-not-found" || error.code === 404) {
                        //             this.team1Players.push({...player, imageUrl: 'assets/profile_300.png'});
                        //         }
                        //     });
                        // });
                        this.rosterChanged();
                    });
                }
            });

            this.data.getTeamById(this.match.team2.id).then(value => {
                const data = value.data();
                if(data) {
                    this.team2 = {id: this.match.team2.id, ...computeTeamTitles(data.name)};

                    this.data.getPlayersByTeam$(this.team2.id).subscribe(value => {
                        this.team2Players = value;
                        // value.forEach(player => {
                        //     // todo image placeholders
                        //     const ref = this.storage.ref('thumbs/256_' + player.imageUrl + '.jpg');
                        //     ref.getDownloadURL().subscribe(img => {
                        //         this.team2Players.push({...player, imageUrl: img});
                        //     }, error => {
                        //         if(error.code === "storage/object-not-found" || error.code === 404) {
                        //             this.team2Players.push({...player, imageUrl: 'assets/profile_300.png'});
                        //         }
                        //     });
                        // });
                        this.ready = true;
                    });
                }
            });
            // computeTimeString(this.match.date, this.match.endDate);
        });

    }

    rosterChanged() {
        if(this.rosterSegment === 'team1') {
            this.selectedRoster = this.team1Players;
        } else {
            this.selectedRoster = this.team2Players;
        }
    }

    getForMatch(player: Player) {
        if(player.matches[this.match.id]) {
            return player.matches[this.match.id];
        } else {
            return player.matches["init"];
        }
    }

}
