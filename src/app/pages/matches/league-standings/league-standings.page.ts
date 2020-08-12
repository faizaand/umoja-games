import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Table} from '../../../data/table';
import {DataService} from '../../../data/data.service';

@Component({
    selector: 'app-league-standings',
    templateUrl: './league-standings.page.html',
    styleUrls: ['./league-standings.page.scss'],
})
export class LeagueStandingsPage implements OnInit {

    category;
    tables: Table[];
    loading = true;

    constructor(private route: ActivatedRoute, private db: DataService) {
    }

    ngOnInit() {
        this.category = this.route.snapshot.params.category;
        this.db.getLeagueTablesByCategory$(this.category).subscribe(value => {
            this.tables = value;
            this.tables.forEach(table => {
                table.teams.sort((a, b) => a.pos - b.pos);
            });

            this.loading = false;
        });
    }

}
