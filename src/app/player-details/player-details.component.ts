import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import { Location } from '@angular/common';
import {AppProgressComponent} from "../common/app-progress.component";
import {PlayerService} from "../services/player-info.service";
import {Player} from "../dto/player";
import {PlayerHistory} from "../dto/playerHistory";
import {Router, ActivatedRoute, RouterState} from "@angular/router";
import {PlayerType} from "../dto/player-types";
import {Team} from "../dto/team";
import {Observable} from "rxjs";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],

  providers: [PlayerService, AppProgressComponent]
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  @Input()
  player: Player;

  @Input()
  playerHistory: PlayerHistory[] = [];

  constructor(private router: Router, private location:Location, private playerService: PlayerService) {
    // console.log("length" + this.playerHistory.length);
    this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    if (typeof this.player !== 'undefined' ) {
      console.log("undefined 0");
      this.playerHistory = this.player.playerHistories;
    } else {
      const state: Player =history.state;
      console.log(state.valueOf());     // if(typeof history.state ==='Player'){
      console.log(state);     // if(typeof history.state ==='Player'){


      // if ( state.isPrototypeOf(Player)) {
      //   console.log('no: ');     // if(typeof history.state ==='Player'){
      //
      // }else {
      //   console.log('yes: ');     // if(typeof history.state ==='Player'){
      //
      // }

      this.player=history.state;
      // if (this.player || typeof this.player === 'undefined') {
      //     console.log('no: ');     // if(typeof history.state ==='Player'){
      //
      // }else {
      //     console.log('yes: ');     // if(typeof history.state ==='Player'){
      //
      // }
      // console.log('location: ');     // if(typeof history.state ==='Player'){
      // console.log(this.location.getState().isPrototypeOf(Player));     // if(typeof history.state ==='Player'){
      // if(this.location.getState().isPrototypeOf(Player)){
      //   console.log('yes: ');     // if(typeof history.state ==='Player'){
      //
      // }else {
      //   console.log('no: ');     // if(typeof history.state ==='Player'){
      //
      // }
      //   console.log("null 1");
      //
      // }
      // if (history.state instanceof Player){
      //   console.log("not null ");
      //
      // }
      // console.log("undefined 1");
    }
      // console.log(history.state.toString());
      // console.log("undefined 1");

      // if (typeof history.state !== 'undefined') {

      // if (history.state instanceof Player) {
      //   console.log("undefined 2");
      //   this.player = history.state;
      //   this.playerHistory = this.player.playerHistories;
      // } else {
      //   console.log("undefined 3");
      //   this.player = this.initPlayer();
      //   this.playerHistory = this.player.playerHistories;
      // }
    // }


    // else {
    //   console.log("undefined 3");
    // }

    // console.log("length" + this.playerHistory.length);
  }

  public initPlayer(): Player {
    return new Player(1, 'pfName', 'psName', '', '177815.png', 34, 2.9, 2, 0, 2, 0,
      74.6, 18.3, 155.0, new PlayerType(1, 'Defender', 'DEF'), new Team(1, 'Liverpool', 3), [
        new PlayerHistory(1, 32, new Date()),
        new PlayerHistory(2, 22, new Date()),
        new PlayerHistory(3, 62, new Date()),
        new PlayerHistory(4, 13, new Date()),
        new PlayerHistory(5, 9, new Date()),
      ])
  }

  ngOnDestroy() {
  }
}
