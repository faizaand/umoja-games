import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {MatchListCardComponent} from './match-list-card/match-list-card.component';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        PipesModule
    ],
    declarations: [
        MatchListCardComponent
    ],
    exports: [
        MatchListCardComponent
    ]
})

export class SharedModule {}
