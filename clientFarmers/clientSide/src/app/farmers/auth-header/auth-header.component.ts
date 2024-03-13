import { AuthService } from './../../auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css'],
})
export class AuthHeaderComponent implements OnInit, OnDestroy {
  userRole;
  userIsSuperUser;
  userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    // this.userRole = this.authService.getRole();
    // console.log(this.userRole);

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    // this.userRole = localStorage.getItem('role');
    // console.log(this.userRole);
    // this.userIsSuperUser = this.authService.getRole();
  }

  onLogout() {
    this.authService.logout();
    this.userRole = null;
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
