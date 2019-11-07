import {Component, ViewChild, OnInit, OnDestroy, Input} from "@angular/core";
import {Router} from "@angular/router";
import {AppProgressComponent} from "../common/app-progress.component";
import {PlayerService} from "../services/player-info.service";
import {PlayerType} from "../dto/player-types";
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Team} from "../dto/team";
import {PlayerSearchRequest} from "../dto/player-search-request";
import {Player} from "../dto/player";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {debounceTime} from "rxjs/internal/operators";
import {PlayerHistory} from "../dto/playerHistory";

@Component({
  selector: 'app-player',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css'],

  providers: [PlayerService, AppProgressComponent]
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild('appProgress', {static: false})
  appProgress: AppProgressComponent;
  @ViewChild('appProgressloadPage', {static: false})
  appProgressloadPage: AppProgressComponent;

  playerTypes: PlayerType[] = [];
  selectedPlayer: Player;
  selectedPlayerHistory: PlayerHistory[] = [];
  teams: Team[] = [];
  players: Player[] = [];
  isDetailsVisible: boolean = false;

  // public selectedTeam: Team;
  // public selectedPlayType: PlayerType;

  public selectedTeam: number;
  public selectedPlayType: number;

  @Input()
  public playerSearchRequest: PlayerSearchRequest;

  myControl = new FormControl('', [Validators.required, Validators.minLength(2)]);

  filteredOptions: Observable<Player[]>;

  public addForm: FormGroup;
  public playerId: number;
  // public secondName: Player;
  // public player: Player;


  constructor(private router: Router, private _fb: FormBuilder, private playerService: PlayerService) {
  }

  ngOnInit(): void {
    console.log('Init Teams');
    this.playerService.getTeams().subscribe(res=> {
      this.teams = res;
    });

    console.log('Init Player Types');
    this.playerService.getPlayerTypes().subscribe(res=> {
      this.playerTypes = res;
    });
    this.addForm = this._fb.group({
      playerId: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
    console.log("Finished init...")
  }

  searchPlayers() {
    console.log('Search players....');
    this.playerSearchRequest = new PlayerSearchRequest(this.selectedTeam, this.selectedPlayType);

    this.players = [];
    this.filteredOptions = null;
    this.myControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.isDetailsVisible = false;

// this.playerId=null;
// this.player=null;
    this.playerService.getPlayers(this.playerSearchRequest)
      .subscribe(res=> {
          this.players = res;
        },
        error => console.log(error)
      );

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value=> typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.players.slice())
      );
    console.log('Finish search players....');
    console.log('Finish search players....' + this.myControl.value);
  }

  // displayFn(player: Player): String | undefined  {
  // displayFn(player: Player): String  {
  //   if (player === null) {
  //     return '';
  //   }
  //
  //   if (player.secondName === null) {
  //     return '';
  //   }
  //   return player.firstName +' ' +player.secondName ;
  // }

  displayFn(id) {
    if (!id) {
      return '';
    }
    this.playerId = id;
    console.log("this.playerId=: " + this.playerId);

    let index = this.players.findIndex(state => state.id === id);
    return this.players[index].firstName + ' ' + this.players[index].secondName;
  }

  private _filter(player: String): Player[] {
    console.log("player: " + player.toString());
    if (player === undefined) {
      return this.players;
    }
    const filterValue = player.toLowerCase();
    return this.players.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  showDetails() {
    if (this.playerId) {
      this.isDetailsVisible = true;
      this.playerService.getPlayerDetails(this.playerId)
        .subscribe(res=> {
            this.selectedPlayer = res;
            this.selectedPlayerHistory = res.playerHistories;
          },
          error => console.log(error)
        );
    } else {
      console.log("no id ");
      this.isDetailsVisible = false;
    }
  }

  ngOnDestroy() {
  }
}
