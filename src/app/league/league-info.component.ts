import {Component, ViewChild, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {LeagueService} from "../services/league-info.service";
import {AppProgressComponent} from "../common/app-progress.component";
import {League} from "../dto/league";
import {LeagueMember} from "../dto/leagueMember";
import {style, animate, state, transition, trigger} from "@angular/animations";
import {MatSidenavContainer} from "@angular/material";
import {Player} from "../dto/player";
import {PlayerHistory} from "../dto/playerHistory";
import {PlayerType} from "../dto/player-types";
import {Team} from "../dto/team";


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
    this.leagueMembers = [new LeagueMember(1, 1, 'test Name', 2323, [
      new Player(1, 'pfName', 'psName', '', '177815.jpg', 34, 2.9, 2, 0, 2, 0,
        74.6, 18.3, 155.0, new PlayerType(1, 'Defender', 'DEF'), new Team(1, 'Liverpool', 3), [
          new PlayerHistory(1, 32, new Date()),
          new PlayerHistory(2, 22, new Date()),
          new PlayerHistory(3, 62, new Date()),
          new PlayerHistory(4, 13, new Date()),
          new PlayerHistory(5, 9, new Date()),
        ])])];
    // this.leagueService.getLeagueInfo().subscribe(res => {
    //   this.league = res;
    //   this.leagueName = this.league.name;
    // this.leagueMembers = this.league.leagueMembers;
    // this.leagueMembers = [new LeagueMember(1, 1, 'test Name', 2323, [
    //   new Player(1, 'pfName', 'psName', '', 34, [
    //     new PlayerHistory(1, 32, new Date()),
    //     new PlayerHistory(2, 22, new Date()),
    //     new PlayerHistory(3, 62, new Date()),
    //     new PlayerHistory(4, 13, new Date()),
    //     new PlayerHistory(5, 9, new Date()),
    //   ]),
    //   new Player(2, 'pfName1', 'psName1', '', 345, [
    //     new PlayerHistory(1, 3, new Date()),
    //     new PlayerHistory(2, 6, new Date()),
    //     new PlayerHistory(3, 8, new Date()),
    //     new PlayerHistory(4, 2, new Date()),
    //     new PlayerHistory(5, 0, new Date()),
    //   ]),
    //   new Player(4, 'pfName3', 'psName1', 'Joined Bordeaux on a permanent deal on 6/8', 445, [
    //     new PlayerHistory(1, 2, new Date()),
    //     new PlayerHistory(2, 4, new Date()),
    //     new PlayerHistory(3, 7, new Date()),
    //     new PlayerHistory(4, 2, new Date()),
    //     new PlayerHistory(5, 9, new Date()),
    //   ]),
    //   new Player(8, 'pfName7', 'psName1', 'test news', 30, [
    //     new PlayerHistory(1, 34, new Date(2019,10,3)),
    //     new PlayerHistory(2, 46, new Date(2019,4,23)),
    //     new PlayerHistory(3, 68, new Date(2019,6,31)),
    //     new PlayerHistory(4, 57, new Date(2019,2,12)),
    //     new PlayerHistory(5, 24, new Date(2019,8,8)),
    //   ]),
    //   new Player(10, 'pfName9', 'psName1', '', 375, [
    //     new PlayerHistory(1, 45, new Date()),
    //     new PlayerHistory(2, 35, new Date()),
    //     new PlayerHistory(3, 7, new Date()),
    //     new PlayerHistory(4, 68, new Date()),
    //     new PlayerHistory(5, 3, new Date()),
    //   ]),
    //   new Player(12, 'pfName12', 'psName1', 'news news news news news newsnewsnews ws ws ws ws ws ws ws ws ws ws ws ws ws ws ', 25, [
    //     new PlayerHistory(1, 234, new Date()),
    //     new PlayerHistory(2, 76, new Date()),
    //     new PlayerHistory(3, 46, new Date()),
    //     new PlayerHistory(4, 46, new Date()),
    //     new PlayerHistory(5, 24, new Date()),
    //   ])
    // ])];
    // });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    // this.navcontainer.updateContentMargins();
  }

  ngOnDestroy() {
  }
}
