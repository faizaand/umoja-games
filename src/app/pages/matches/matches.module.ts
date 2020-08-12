import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MatchesPage} from './matches.page';
import {PipesModule} from '../../pipes/pipes.module';
import {SharedModule} from '../../components/shared.module';

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
        PipesModule,
        SharedModule
    ],
    declarations: [MatchesPage]
})
export class MatchesPageModule {
}
