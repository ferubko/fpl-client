import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AppProgressComponent} from "../common/app-progress.component";
import {PlayerService} from "../services/player-info.service";
import {Player} from "../dto/player";
import {PlayerHistory} from "../dto/playerHistory";
import {Router} from "@angular/router";
import {PlayerType} from "../dto/player-types";
import {Team} from "../dto/team";

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
    this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    if (this.player !== undefined) {
      this.playerHistory = this.player.playerHistories;
    } else {
      if (history.state.id !== undefined) {
        this.player = history.state;
        this.playerHistory = this.player.playerHistories;
      } else {
        this.player = this.initPlayer();
        this.playerHistory = this.player.playerHistories;
      }
    }
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
