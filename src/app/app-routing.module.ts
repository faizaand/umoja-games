import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'team-detail', loadChildren: './pages/teams/team-detail/team-detail.module#TeamDetailPageModule' },
  { path: 'player-detail', loadChildren: './pages/teams/player-detail/player-detail.module#PlayerDetailPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
