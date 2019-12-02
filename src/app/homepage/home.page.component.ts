import {Component, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";
import {trigger, state, transition, animate, style} from "@angular/animations";
import {AuthenticationService} from "../services/auth.service";

@Component({
  selector: 'home-page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ],
  providers: [AuthenticationService]
})

export class HomePageComponent {
  @ViewChild('sidenav', {static: false})
  public sidenav: MatSidenav;

  isSignedIn: boolean;

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isUserLoggedIn();
    if(!this.isSignedIn){
      this.logout();
    }
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
