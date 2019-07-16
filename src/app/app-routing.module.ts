import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'match-detail', loadChildren: './pages/matches/match-detail/match-detail.module#MatchDetailPageModule' },
  { path: 'match-admin', loadChildren: './pages/matches/match-admin/match-admin.module#MatchAdminPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
