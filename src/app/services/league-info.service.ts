import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {League} from "../dto/league";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable()
export class LeagueService {
  private localhost = "http://localhost:8080/leagueMember";
  private _leagueMember = "/all";
  private _details = "/details/";

  constructor(private http: HttpClient) {
  }

  getLeagueInfo(): Observable<any> {
    const url = this.localhost + this._leagueMember;

    return this.http.get<League>(url)
      .pipe(catchError(this.handleError));
  }

  getLeagueMemberDetails(memberId: number): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'responseType': 'blob'});
    const options = {headers: headers};
    const url = this.localhost + this._details + memberId;
    return this.http.post(url, options);
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
