import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'team-detail', loadChildren: './pages/teams/team-detail/team-detail.module#TeamDetailPageModule' },
  { path: 'player-detail', loadChildren: './pages/teams/player-detail/player-detail.module#PlayerDetailPageModule' },
  { path: 'admin-match-edit', loadChildren: './pages/admin/admin-match-edit/admin-match-edit.module#AdminMatchEditPageModule' },
  { path: 'admin-team-edit', loadChildren: './pages/admin/admin-team-edit/admin-team-edit.module#AdminTeamEditPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
