export class PlayerSearchRequest {
  teamId: number;
  playerTypeId: number;

  constructor(teamId: number, playerTypeId: number) {
    this.teamId = teamId;
    this.playerTypeId = playerTypeId;
  }
}
