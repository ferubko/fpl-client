export class PlayerHistory {

  public id: number;
  public opponentTeam: number;
  public totalPoints: number;
  kickoffTime: Date;

  constructor(id: number, totalPoints: number, kickoffTime: Date) {
    this.id = id;
    this.totalPoints = totalPoints;
    this.kickoffTime = kickoffTime;
  }
}
