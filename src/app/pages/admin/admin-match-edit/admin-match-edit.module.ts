import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminMatchEditPage } from './admin-match-edit.page';
import {MatchEditorComponent} from '../../../components/match-editor/match-editor.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMatchEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
    declarations: [AdminMatchEditPage, MatchEditorComponent]
})
export class AdminMatchEditPageModule {}
