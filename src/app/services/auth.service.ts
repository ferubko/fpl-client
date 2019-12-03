import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {User} from "../dto/user";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private localhost = "https://fantasy-pl.herokuapp.com/api/auth/login";

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username, password) {
    return this.httpClient.post<User>(this.localhost, {username, password})
      .pipe(
        map(
          userData => {
            sessionStorage.setItem('username', JSON.stringify(userData.username));
            sessionStorage.setItem('token', JSON.stringify(userData.token));
            return userData;
          }
        )
      );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('token');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.clear();
  }
}
