import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'matches',
        children: [
          {
            path: '',
            loadChildren: '../pages/matches/matches.module#MatchesPageModule'
          },
          {
            path: 'admin',
            pathMatch: 'full',
            loadChildren: '../pages/matches/match-admin/match-admin.module#MatchAdminPageModule'
          },
          {
            path: ':id',
            loadChildren: '../pages/matches/match-detail/match-detail.module#MatchDetailPageModule'
          }
        ]
      },
      {
        path: 'teams',
        children: [
          {
            path: '',
            loadChildren: '../pages/teams/teams.module#TeamsPageModule'
          }
        ]
      },
      {
        path: 'info',
        children: [
          {
            path: '',
            loadChildren: '../pages/info/info.module#InfoPageModule'
          }
        ]
      },
      {
        path: 'near',
        children: [
          {
            path: '',
            loadChildren: '../pages/near/near.module#NearPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
