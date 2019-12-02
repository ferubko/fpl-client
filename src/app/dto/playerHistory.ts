export class PlayerHistory {

  public id: number;
  public element: number;
  public opponentTeam: number;
  public totalPoints: number;
  kickoffTime: number;

  constructor(id: number, totalPoints: number, kickoffTime: number) {
    this.id = id;
    this.totalPoints = totalPoints;
    this.kickoffTime = kickoffTime;
  }
}
