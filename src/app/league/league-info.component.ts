import {Component, ViewChild, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {LeagueService} from "../services/league-info.service";
import {AppProgressComponent} from "../common/app-progress.component";
import {League} from "../dto/league";
import {LeagueMember} from "../dto/leagueMember";
import {style, animate, state, transition, trigger} from "@angular/animations";
import {MatSidenavContainer} from "@angular/material";


@Component({
  selector: 'app-league',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.css'], animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ],
  providers: [LeagueService, AppProgressComponent]
})
export class LeagueComponent implements OnInit, OnDestroy {
  @ViewChild('appProgress', {static: false})
  appProgress: AppProgressComponent;
  @ViewChild('appProgressloadPage', {static: false})
  appProgressloadPage: AppProgressComponent;
  league: League;
  leagueName: String;
  leagueMembers: LeagueMember[] = [];

  events: String[] = [];
  opened: boolean;
  showMenu = false;
  @ViewChild('navcontainer', {static: false})
  navcontainer: MatSidenavContainer;

  constructor(private router: Router, private leagueService: LeagueService) {

  }

  ngOnInit(): void {
    console.log('Get league members');
    this.leagueService.getLeagueInfo().subscribe(res=> {
      this.league = res;
      this.leagueName = this.league.name;
      this.leagueMembers = this.league.leagueMembers;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    // this.navcontainer.updateContentMargins();
  }

  ngOnDestroy() {
  }
}
