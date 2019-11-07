export class PlayerHistory {

  private id: number;
  private opponentTeam: number;
  private totalPoints: number;
  private kickoffTime: Date;

  constructor(id: number, totalPoints: number, kickoffTime: Date) {
    this.id = id;
    this.totalPoints = totalPoints;
    this.kickoffTime = kickoffTime;
  }
}
