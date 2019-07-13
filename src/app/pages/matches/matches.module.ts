import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatchesPage } from './matches.page';
import {PipesModule} from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: MatchesPage
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
  declarations: [MatchesPage]
})
export class MatchesPageModule {}
