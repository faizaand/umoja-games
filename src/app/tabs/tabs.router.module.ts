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
            path: ':id',
            loadChildren: '../pages/matches/match-detail/match-detail.module#MatchDetailPageModule'
          },
          {
            path: 'standings/:category',
            loadChildren: '../pages/matches/league-standings/league-standings.module#LeagueStandingsPageModule'
          }
        ]
      },
      {
        path: 'teams',
        children: [
          {
            path: '',
            loadChildren: '../pages/teams/teams.module#TeamsPageModule'
          },
          {
            path: 'team/:id',
            loadChildren: '../pages/teams/team-detail/team-detail.module#TeamDetailPageModule'
          },
          {
            path: 'team/:id/player/:playerId',
            loadChildren: '../pages/teams/player-detail/player-detail.module#PlayerDetailPageModule'
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
        path: 'admin',
        children: [
          {
            path: '',
            loadChildren: '../pages/admin/admin.module#AdminPageModule'
          },
          {
            path: 'check-in',
            loadChildren: '../pages/admin/admin-check-in/admin-check-in.module#AdminCheckInPageModule'
          },
          {
            path: 'match-edit',
            loadChildren: '../pages/admin/admin-match-edit/admin-match-edit.module#AdminMatchEditPageModule'
          },
          {
            path: 'team-edit/:matchId/:teamId',
            loadChildren: '../pages/admin/admin-team-edit/admin-team-edit.module#AdminTeamEditPageModule'
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
