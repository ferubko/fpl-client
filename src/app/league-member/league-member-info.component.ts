import {Component, ViewChild, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {LeagueService} from "../services/league-info.service";
import {AppProgressComponent} from "../common/app-progress.component";
import {LeagueMember} from "../dto/leagueMember";
import {Player} from "../dto/player";
import {style, state, animate, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-league-member-details',
  templateUrl: './league-member-info.component.html',
  styleUrls: ['./league-member-info.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [LeagueService, AppProgressComponent]
})
export class LeagueMemberComponent implements OnInit, OnDestroy {
  @ViewChild('appProgress', {static: false})
  appProgress: AppProgressComponent;
  @ViewChild('appProgressloadPage', {static: false})
  appProgressloadPage: AppProgressComponent;

  displayedColumns: string[] = ['firstName', 'secondName', 'news', 'totalPoints'];
  leagueMember: LeagueMember| null;
  memberPlayers: Player[] = [];
  leagueMemberId: number;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private leagueService: LeagueService) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  cellClicked(element: Player) {
    console.log(element.firstName + ' cell clicked');
    this.router.navigate(['/player-details', element.id], {state: element});
  }

  ngOnInit(): void {
    console.log('Get league member details');
    if (history.state.id !== undefined) {
      this.leagueMember = history.state;
      this.memberPlayers = this.leagueMember.startingLineup;
    } else {
      this.activeRoute.params.subscribe(p=> {
        if (p['id']) {
          console.log(p['id']);
          this.leagueMemberId = p['id'];
        }
      });
      if (this.leagueMemberId && this.leagueMemberId !== undefined) {
        this.leagueService.getLeagueMemberDetails(this.leagueMemberId)
          .subscribe(res=> {
              this.leagueMember = res;
              this.memberPlayers = this.leagueMember.startingLineup;
            },
            error => console.log(error)
          );
      }
    }

    // this.leagueMember = new LeagueMember(1, 1, 'test Name', 2323, [
    //   new Player(1, 'pfName', 'psName', '', '177815.png',34, 2.9, 2, 0, 2, 0,
    //     74.6,18.3,155.0,new PlayerType(1, 'Defender', 'DEF'), new Team(1, 'Liverpool', 3),    [
    //     new PlayerHistory(1, 32, new Date()),
    //     new PlayerHistory(2, 22, new Date()),
    //     new PlayerHistory(3, 62, new Date()),
    //     new PlayerHistory(4, 13, new Date()),
    //     new PlayerHistory(5, 9, new Date()),
    //   ]) ]);
    // new Player(2, 'pfName1', 'psName1', '', 345, [
    //   new PlayerHistory(1, 3, new Date()),
    //   new PlayerHistory(2, 6, new Date()),
    //   new PlayerHistory(3, 8, new Date()),
    //   new PlayerHistory(4, 2, new Date()),
    //   new PlayerHistory(5, 0, new Date()),
    // ]),
    // new Player(4, 'pfName3', 'psName1', 'Joined Bordeaux on a permanent deal on 6/8', 445, [
    //   new PlayerHistory(1, 2, new Date()),
    //   new PlayerHistory(2, 4, new Date()),
    //   new PlayerHistory(3, 7, new Date()),
    //   new PlayerHistory(4, 2, new Date()),
    //   new PlayerHistory(5, 9, new Date()),
    // ]),
    // new Player(8, 'pfName7', 'psName1', 'test news', 30, [
    //   new PlayerHistory(1, 34, new Date()),
    //   new PlayerHistory(2, 46, new Date()),
    //   new PlayerHistory(3, 68, new Date()),
    //   new PlayerHistory(4, 57, new Date()),
    //   new PlayerHistory(5, 24, new Date()),
    // ]),
    // new Player(10, 'pfName9', 'psName1', '', 375, [
    //   new PlayerHistory(1, 45, new Date()),
    //   new PlayerHistory(2, 35, new Date()),
    //   new PlayerHistory(3, 7, new Date()),
    //   new PlayerHistory(4, 68, new Date()),
    //   new PlayerHistory(5, 3, new Date()),
    // ]),
    // new Player(12, 'pfName12', 'psName1', 'news news news news news newsnewsnews ws ws ws ws ws ws ws ws ws ws ws ws ws ws ', 25, [
    //   new PlayerHistory(1, 234, new Date()),
    //   new PlayerHistory(2, 76, new Date()),
    //   new PlayerHistory(3, 46, new Date()),
    //   new PlayerHistory(4, 46, new Date()),
    //   new PlayerHistory(5, 24, new Date()),
    // ])


    // this.dataSource=this.memberPlayers;
  }

  selectPlayer(selectedPlayer: any) {
    console.log("player selected " + selectedPlayer);
  }

  ngOnDestroy() {
  }
}
