import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'matches',
        children: [
          {
            path: '',
            loadChildren: '../matches/matches.module#MatchesPageModule'
          }
        ]
      },
      {
        path: 'rosters',
        children: [
          {
            path: '',
            loadChildren: '../rosters/rosters.module#RostersPageModule'
          }
        ]
      },
      {
        path: 'nearby',
        children: [
          {
            path: '',
            loadChildren: '../nearby/nearby.module#NearbyPageModule'
          }
        ]
      },
      {
        path: 'info',
        children: [
          {
            path: '',
            loadChildren: '../info/info.module#InfoPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/matches',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/matches',
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
