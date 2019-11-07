import {PlayerHistory} from "./playerHistory";
export class Player {

  id: number;
  code: number;
  firstName: String;
  secondName: String;
  news: String;
  totalPoints: number;
  playerHistories: PlayerHistory[];

  constructor(id: number,
              firstName: String,
              secondName: String,
              news: String,
              totalPoints: number,
              playerHistories: PlayerHistory[]) {
    this.id = id;
    this.firstName = firstName;
    this.secondName = secondName;
    this.news = news;
    this.totalPoints = totalPoints;
    this.playerHistories = playerHistories;
  }
}
