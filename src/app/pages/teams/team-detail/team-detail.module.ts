import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TeamDetailPage} from './team-detail.page';
import {SharedModule} from '../../../components/shared.module';

const routes: Routes = [
    {
        path: '',
        component: TeamDetailPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [TeamDetailPage]
})
export class TeamDetailPageModule {
}
