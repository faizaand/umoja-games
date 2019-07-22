import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminTeamEditPage } from './admin-team-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTeamEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminTeamEditPage]
})
export class AdminTeamEditPageModule {}
