import {Injectable, ChangeDetectorRef} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {PlayerHistory} from "../dto/playerHistory";
import {PlayerType} from "../dto/player-types";
import {Team} from "../dto/team";
import {PlayerSearchRequest} from "../dto/player-search-request";

@Injectable()
export class PlayerService {
  private localhost = "https://fpldb.herokuapp.com/player";
  private _playerHistory = "/history";
  private _playerTypes = "/types";
  private _teams = "/teams";
  private _search = "/search";
  private _details = "/details/";

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {
  }


  getPlayerHistory(): Observable<any> {
    const url = this.localhost + this._playerHistory;
    return this.http.get<PlayerHistory>(url)
      .pipe(catchError(this.handleError));
  }

  getPlayerTypes(): Observable<any> {
    const url = this.localhost + this._playerTypes;
    return this.http.get<PlayerType>(url)
      .pipe(catchError(this.handleError));
  }

  getTeams(): Observable<any> {
    const url = this.localhost + this._teams;
    return this.http.get<Team>(url)
      .pipe(catchError(this.handleError));
  }

  getPlayers(playerSearch: PlayerSearchRequest): Observable<any> {
    const body = JSON.stringify(playerSearch);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'responseType': 'blob'});
    const options = {headers: headers};
    const url = this.localhost + this._search;

    return this.http.post(url, body, options);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = error.error.message;
    } else {
      // Server-side errors
      errorMessage = error.message;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getPlayerDetails(playerId: number): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'responseType': 'blob'});
    const options = {headers: headers};
    const url = this.localhost + this._details + playerId;
    // return this.http.post(url, body, options);
    return this.http.post(url, options);
  }
}
