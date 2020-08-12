import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayerStandingsPage } from './player-standings.page';
import {GoalkeepersPipe} from './goalkeepers.pipe';

const routes: Routes = [
  {
    path: '',
    component: PlayerStandingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlayerStandingsPage, GoalkeepersPipe]
})
export class PlayerStandingsPageModule {}
