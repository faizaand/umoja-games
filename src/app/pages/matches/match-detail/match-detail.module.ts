import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatchDetailPage } from './match-detail.page';
import {PipesModule} from '../../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: MatchDetailPage
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
  declarations: [MatchDetailPage]
})
export class MatchDetailPageModule {}
