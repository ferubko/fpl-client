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
  }

  cellClicked(element: Player) {
    this.router.navigate(['/fpl/player-details', element.id], {state: element});
  }

  ngOnInit(): void {
    console.log('Get league member details');
    if (history.state.id !== undefined) {
      this.leagueMember = history.state;
      this.memberPlayers = this.leagueMember.startingLineup;
    } else {
      this.activeRoute.params.subscribe(p=> {
        if (p['id']) {
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
  }

  ngOnDestroy() {
  }
}
