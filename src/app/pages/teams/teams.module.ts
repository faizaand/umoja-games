import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeamsPage } from './teams.page';
import {PipesModule} from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: TeamsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PipesModule
    ],
  declarations: [TeamsPage]
})
export class TeamsPageModule {}
