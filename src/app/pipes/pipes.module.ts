import { NgModule } from '@angular/core';
import { MatchcategoryPipe } from './matchcategory.pipe';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [MatchcategoryPipe],
  imports: [
    IonicModule
  ],
  exports: [MatchcategoryPipe]
})
export class PipesModule { }
