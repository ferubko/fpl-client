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
    // this.router.getCurrentNavigation().extras.state;
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    // pointBackgroundColor: 'rgba(29, 83, 150)',
    // colors: [
    //   {
    //     backgroundColor: 'rgba(29, 83, 150, 0.6)',
    //     hoverBackgroundColor: 'rgba(29, 83, 150, 1)'
    //   }
    // ],
    scales: {
      xAxes: [{
        beginAtZero: true,
        display: true,
        type: 'time',
        distribution: 'series',
        gridLines: {
          display: true
        },
        time: {
          displayFormats: {
            millisecond: 'D MMM YYYY',
            second: 'D MMM YYYY',
            minute: 'D MMM YYYY',
            hour: 'D MMM YYYY',
            day: 'D MMM YYYY',
            week: 'll',
            month: 'll',
            quarter: 'll',
            // year: 'll'
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 15
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 100,
          min: 0,
          stepSize: 25
        }
      }],

    }
  };

  private lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.5)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public barChartLabels: Array<Date> = [];
  public barChartData: any[] = [];
  public barChartDataSet: any[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;


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
    this.playerHistory.sort((a: PlayerHistory, b: PlayerHistory) => {
      return a.kickoffTime.getTime() - b.kickoffTime.getTime();

    });
    for (var _i = 0; _i < this.playerHistory.length; _i++) {
      console.log(_i);
      var his = this.playerHistory[_i];
      this.barChartLabels.push(his.kickoffTime);
      this.barChartData.push(his.totalPoints);
    }
    this.barChartDataSet = [{data: this.barChartData, label: 'Points History'}];

    // this.playerHistory.forEach(his->{
    //
    //   this.barChartLabels.push(his.kickoffTime);
    //   this.barChartData.push(his.totalPoints);
    //
    // });
  }

  public initPlayer(): Player {
    // if (this.playerId) {
    //   this.playerService.getPlayerDetails(this.playerId)
    //     .subscribe(res=> {
    //         this.selectedPlayer = res;
    //       },
    //       error => console.log(error)
    //     );
    // } else {
    //   console.log("no id ");
    // }

    return new Player(1, 'pfName', 'psName', 'test news Suspended until 30 Nov', '177815.png', 34, 2.9, 2, 0, 2, 0,
      74.6, 18.3, 155.0, new PlayerType(1, 'Defender', 'DEF'), new Team(1, 'Liverpool', 3), [
        new PlayerHistory(1, 13, new Date("2019-10-18")),
        new PlayerHistory(2, 22, new Date("2014-08-01")),
        new PlayerHistory(3, 62, new Date("2015-10-14")),
        new PlayerHistory(4, 13, new Date("2016-06-26")),
        new PlayerHistory(5, 9, new Date("2014-10-10"))
      ])
  }

  ngOnDestroy() {
  }
}
