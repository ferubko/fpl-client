import {Player} from "./player";
export class LeagueMember {
  id: number;
  eventTotal: number;
  playerName: String;
  rank: number;
  lastRank: number;
  rankSort: number;
  total: number;
  entry: number;
  entryName: String;
  startingLineup: Player[];

  constructor(id: number,
              eventTotal: number,
              playerName: String,
              total: number,
              startingLineup: Player[]) {
    this.id = id;
    this.eventTotal = eventTotal;
    this.playerName = playerName;
    this.total = total;
    this.startingLineup = startingLineup;
  }
}
