import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {League} from "../dto/league";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable()
export class LeagueService {
  private localhost = "http://localhost:8080/leagueMember";
  private _leagueMember = "/all";

  constructor(private http: HttpClient) {
  }

  getLeagueInfo(): Observable<any> {
    let url = this.localhost + this._leagueMember;

    return this.http.get<League>(url)
      .pipe(catchError(this.handleError));
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
}
