import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-player-standings',
  templateUrl: './player-standings.page.html',
  styleUrls: ['./player-standings.page.scss'],
})
export class PlayerStandingsPage implements OnInit {

  category;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.category = this.route.snapshot.params.category;
  }

}
