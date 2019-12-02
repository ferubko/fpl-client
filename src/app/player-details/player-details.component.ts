import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AppProgressComponent} from "../common/app-progress.component";
import {PlayerService} from "../services/player-info.service";
import {Player} from "../dto/player";
import {PlayerHistory} from "../dto/playerHistory";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],

  providers: [PlayerService, AppProgressComponent]
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  @Input()
  player: Player;
  playerId: number;

  public barChartLabels: Array<number> = [];
  public barChartData: any[] = [];
  public barChartDataSet: any[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private playerService: PlayerService) {
    this.activeRoute.params.subscribe(p=> {
      if (p['id']) {
        this.playerId = p['id'];
      }
    });
  }


  ngOnInit(): void {
    if (this.player && this.player !== undefined) {
      this.initGraphData(this.player);
    } else {
      if (history.state.id !== undefined) {
        this.player = history.state;
        this.initGraphData(this.player);
      } else {
        this.initPlayer();
      }
    }
  }

  private initPlayer() {
    this.playerService.getPlayerDetails(this.playerId)
      .subscribe(res=> {
          let searchResponse = <Player> (res);
          this.player = searchResponse;
          this.initGraphData(searchResponse);
        },
        error => console.log(error)
      );
  }

  initGraphData(player: Player) {
    const history = player.playerHistory;
    history.sort((a: PlayerHistory, b: PlayerHistory) => {
      return a.kickoffTime - b.kickoffTime;
    });
    for (var _i = 0; _i < history.length; _i++) {
      var his = history[_i];
      this.barChartLabels.push(his.kickoffTime);
      this.barChartData.push(his.totalPoints);
    }
    this.barChartDataSet = [{data: this.barChartData, label: 'Points'}];
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
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
          autoSkip: true,
          maxTicksLimit: 15
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

  ngOnDestroy() {
  }
}
