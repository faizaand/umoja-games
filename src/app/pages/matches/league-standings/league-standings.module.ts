import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeagueStandingsPage } from './league-standings.page';

const routes: Routes = [
  {
    path: '',
    component: LeagueStandingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeagueStandingsPage]
})
export class LeagueStandingsPageModule {}
