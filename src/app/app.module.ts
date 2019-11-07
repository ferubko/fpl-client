import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LeagueComponent} from "./league/league-info.component";
import {AppProgressComponent} from "./common/app-progress.component";
import {CoreMaterialModule} from "./core-material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {PlayerComponent} from "./player/player-info.component";
import {LeagueMemberComponent} from "./league-member/league-member-info.component";
import {PlayerDetailsComponent} from "./player-details/player-details.component";

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    PlayerComponent,
    PlayerDetailsComponent,
    LeagueMemberComponent,
    AppProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CoreMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
