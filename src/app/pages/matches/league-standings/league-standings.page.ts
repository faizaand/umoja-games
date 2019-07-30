import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-league-standings',
  templateUrl: './league-standings.page.html',
  styleUrls: ['./league-standings.page.scss'],
})
export class LeagueStandingsPage implements OnInit {

  category;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.category = this.route.snapshot.params.category;
  }

}
