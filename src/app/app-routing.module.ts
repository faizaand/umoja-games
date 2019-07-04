import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'matches', loadChildren: './matches/matches.module#MatchesPageModule' },
  { path: 'rosters', loadChildren: './rosters/rosters.module#RostersPageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'nearby', loadChildren: './nearby/nearby.module#NearbyPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
