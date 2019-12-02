import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {PlayerComponent} from "./player/player-info.component";
import {LeagueMemberComponent} from "./league-member/league-member-info.component";
import {PlayerDetailsComponent} from "./player-details/player-details.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./login/login.component";
import {HomePageComponent} from "./homepage/home.page.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'fpl',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    data: {title: 'FPL'},
    children: [
      {
        path: '',
        redirectTo: 'fpl',
        pathMatch: 'full'
      },
      {
        path: 'player',
        component: PlayerComponent,
        canActivate: [AuthGuard],
        data: {title: 'Player'}
      },
      {
        path: 'player-details/:id',
        component: PlayerDetailsComponent,
        canActivate: [AuthGuard],
        data: {title: 'Player Details'}
      },
      {
        path: 'league-member/:id',
        component: LeagueMemberComponent,
        canActivate: [AuthGuard],
        data: {title: 'League Member'}
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
