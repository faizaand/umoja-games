import { Component, OnInit } from '@angular/core';
import {Team} from '../../../data/team';
import {Player} from '../../../data/player';
import {DataService} from '../../../data/data.service';
import {categories} from '../../../data/categories';

@Component({
  selector: 'app-admin-team-edit',
  templateUrl: './admin-team-edit.page.html',
  styleUrls: ['./admin-team-edit.page.scss'],
})
export class AdminTeamEditPage implements OnInit {

  categories = categories.map(value => value.name);
  selectedCategory: string;

  teams = [];
  selectedTeam: Team;

  players = [];
  selectedPlayer: Player;

  constructor(private db: DataService) { }

  ngOnInit() {
  }

  onCategorySelect() {
    this.db.getTeamsByCategory(this.selectedCategory).subscribe(value => {
      this.teams = value;
    });
  }

  onTeamSelect() {
    this.db.getPlayersByTeam$(this.selectedTeam.id).subscribe(value => {
      this.players = value;
    });
  }

  onPlayerSelect() {

  }

  step(field: string, value: any) {
    if(this.selectedPlayer[field] + value < 0) return;
    this.selectedPlayer[field] = this.selectedPlayer[field] + value;
    this.db.updatePlayer(this.selectedPlayer);
  }

}
