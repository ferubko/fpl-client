import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {AppProgressComponent} from "../common/app-progress.component";
import {PlayerService} from "../services/player-info.service";
import {Player} from "../dto/player";
import {PlayerHistory} from "../dto/playerHistory";
import {Router} from "@angular/router";

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

  constructor(private router: Router, private playerService: PlayerService) {
    console.log("length" + this.playerHistory.length);
    this.router.getCurrentNavigation().extras.state.element;
  }

  ngOnInit(): void {
    this.player = history.state;
    this.playerHistory = this.player.playerHistories;
    console.log("length" + this.playerHistory.length);
  }

  ngOnDestroy() {
  }
}
