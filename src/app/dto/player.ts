import {PlayerHistory} from "./playerHistory";
import {PlayerType} from "./player-types";
import {Team} from "./team";

export class Player {

  id: number;
    firstName: String;
    secondName: String;
    news: String;
    photo: String;
    totalPoints: number;
    averagePoints: number;
    goalsScored: number;
    assists: number;
    cleanSheets: number;
    penaltiesSaved: number;
  influence: number;
  creativity: number;
  threat: number;
    playerType: PlayerType;
    team: Team;
  playerHistories: PlayerHistory[];

  constructor(id: number,
              firstName: String,
              secondName: String,
              news: String,
              photo: String,
              totalPoints: number,
              averagePoints: number,
              goalsScored: number,
              assists: number,
              cleanSheets: number,
              penaltiesSaved: number,
              influence: number,
              creativity: number,
              threat: number,
              playerType: PlayerType,
              team: Team,
              playerHistories: PlayerHistory[]) {
    this.id = id;
    this.firstName = firstName;
    this.secondName = secondName;
    this.news = news;
    this.photo = photo;
    this.totalPoints = totalPoints;
    this.averagePoints = averagePoints;
    this.goalsScored = goalsScored;
    this.assists = assists;
    this.cleanSheets = cleanSheets;
    this.penaltiesSaved = penaltiesSaved;
    this.influence = influence;
    this.creativity = creativity;
    this.threat = threat;
    this.playerType = playerType;
    this.team = team;
    this.playerHistories = playerHistories;
  }
}
