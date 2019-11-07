import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LeagueComponent} from "./league/league-info.component";
import {PlayerComponent} from "./player/player-info.component";
import {LeagueMemberComponent} from "./league-member/league-member-info.component";
import {PlayerDetailsComponent} from "./player-details/player-details.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/player',
    pathMatch: 'full'
  },
  {
    path: 'player',
    component: PlayerComponent,
    data: {title: 'Player'}
  },
  {
    path: 'player-details/:id',
    component: PlayerDetailsComponent,
    data: {title: 'Player Details'}
  },
  {
    path: 'league',
    component: LeagueComponent,
    data: {title: 'League'}
  },
  {
    path: 'league-member/:id',
    component: LeagueMemberComponent,
    data: {title: 'League Member'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
