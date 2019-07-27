import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {MatchListCardComponent} from './match-list-card/match-list-card.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    declarations: [
        MatchListCardComponent
    ],
    exports: [
        MatchListCardComponent
    ]
})

export class SharedModule {}
