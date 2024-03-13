import { SuperUserService } from './../super-user/super-user.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsSuperUser: boolean = false;
  userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription;
  private userRoleListner: Subscription;
  userRole;

  constructor(
    public authService: AuthService,
    public router: Router,
    private superUser: SuperUserService
  ) {}
  getNewProduct() {
    this.router.navigate(['farmer', 'add']);
  }
  getListProduct() {
    this.router.navigate(['farmer', 'products']);
  }
  getOrders() {
    this.router.navigate(['farmer', 'order']);
  }
  updateProduct() {
    this.router.navigate(['farmer', 'update']);
  }
  getFarmersList() {
    this.router.navigate(['farmer', 'superFarmerList']);
  }
  getCustomerList() {
    this.router.navigate(['farmer', 'superCustomerList']);
  }
  getLogFile() {
    this.router.navigate(['farmer', 'LogFile']);
  }

  getUserIsSuper() {
    this.userRole === 'superuser'
      ? (this.userIsSuperUser = true)
      : (this.userIsSuperUser = false);
    console.log(this.userIsSuperUser, 'this.userIsSuperUser');
  }
  getOrdersForSuper() {
    this.router.navigate(['farmer', 'superOrderList']);
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.getUserIsSuper();
    console.log(this.userRole);

    this.userIsAuthenticated = this.authService.getIsAuth();
    // this.userIsSuperUser = this.authService.getIsSuper();
    console.log(this.userIsSuperUser, 'if farmer false');
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
