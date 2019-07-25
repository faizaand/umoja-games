import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../../../data/match';
import {computeTeamTitles} from '../../../match-helper';
import {DataService} from '../../../data/data.service';
import {Player} from '../../../data/player';

@Component({
    selector: 'app-match-detail',
    templateUrl: './match-detail.page.html',
    styleUrls: ['./match-detail.page.scss'],
})
export class MatchDetailPage implements OnInit {

    match: Match = {} as any;
    team1: any = {id: 0, title: '', subtitle: ''};
    team2: any = {id: 0, title: '', subtitle: ''};
    rosterSegment: string;
    playerLists: Player[][] = [];
    ready: boolean = false;

    constructor(private route: ActivatedRoute, private data: DataService) {
    }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.data.getMatchById$(id).subscribe(value => {
            this.match = value as Match;

            this.data.getTeamById(this.match.team1.id).then(value => {
                const data = value.data();
                if(data) {
                    this.team1 = {id: this.match.team1.id, ...computeTeamTitles(data.name)};
                    this.rosterSegment = this.team1.id;
                }
            });

            this.data.getTeamById(this.match.team2.id).then(value => {
                const data = value.data();
                if(data) {
                    this.team2 = {id: this.match.team2.id, ...computeTeamTitles(data.name)};
                }
                this.ready = true;
            });
            // computeTimeString(this.match.date, this.match.endDate);
        });

        this.playerLists[this.team1.id] = [];
        this.playerLists[this.team2.id] = [];
        //
        // todo player listings on this page
        // if there's no time, just the links to the team pages will be fine
        //
        // this.data.getPlayersByTeam$(this.team1.id).subscribe(value => {
        //     value.forEach(player => {
        //         this.data.getMediaById$(player.imageUrl).subscribe(img => {
        //             // todo image placeholders
        //             this.playerLists[this.team1.id].push({...player, imageUrl: img.url});
        //         });
        //     });
        // });
        //
        // this.data.getPlayersByTeam$(this.team2.id).subscribe(value => {
        //     value.forEach(player => {
        //         this.data.getMediaById$(player.imageUrl).subscribe(img => {
        //             // todo image placeholders
        //             this.playerLists[this.team2.id].push({...player, imageUrl: img.url});
        //         });
        //     });
        // });
    }

}
