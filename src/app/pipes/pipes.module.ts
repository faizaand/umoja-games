import { NgModule } from '@angular/core';
import { MatchcategoryPipe } from './matchcategory.pipe';
import {IonicModule} from '@ionic/angular';
import {EntitiesPipe} from './entities.pipe';

@NgModule({
  declarations: [MatchcategoryPipe, EntitiesPipe],
  imports: [
    IonicModule
  ],
  exports: [MatchcategoryPipe, EntitiesPipe]
})
export class PipesModule { }
