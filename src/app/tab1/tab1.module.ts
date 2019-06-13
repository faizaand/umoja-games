import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { FollowTeamCardComponent } from '../components/follow-team-card/follow-team-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  entryComponents: [
    FollowTeamCardComponent
  ],
  declarations: [
    Tab1Page, 
    FollowTeamCardComponent
  ]
})
export class Tab1PageModule {}
