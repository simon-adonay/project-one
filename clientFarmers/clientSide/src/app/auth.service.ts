import { FarmerService } from './farmer.service';
import { AuthData } from './farmers/registration/signup/auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private userIsSuperUser = false;
  private token: any;
  private tokenTimer: any;
  public userId: string;
  public userRole: string;
  private authStatusListener = new Subject<boolean>();
  private userRoleListener = new Subject<boolean>();

  role;
  id;

  constructor(
    private http: HttpClient,
    private router: Router // private farmService: FarmerService
  ) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return of(this.userId);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getUserRoleListener() {
    return this.userRoleListener.asObservable();
  }
  signUp(signUpForm) {
    // const authData: AuthData = { email: email, password: password };

    return this.http.post<AuthData>(
      'http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/farmers/signUp',
      signUpForm
    );
  }
  storeToken(response) {
    const token = response.Authorization;
    this.userId = response.user._id;
    this.userRole = response.user.role;

    console.log(this.userId, 'this.userId uuuuuuu');
    localStorage.setItem('userId', this.userId);

    this.token = token;

    if (token) {
      const tokenDuration = response.expiresIn;
      this.setAuthTimer(tokenDuration);
      this.isAuthenticated = true;
      this.userIsSuperUser = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + tokenDuration * 1000);
      console.log(expirationDate);
      this.saveAuthData(token, expirationDate);
      this.router.navigate(['/']);
    }
  }

  getIsSuper() {
    if (this.userRole === 'superuser') {
      this.userIsSuperUser = true;
      console.log(this.userIsSuperUser);
      this.userRoleListener.next(true);
    }
    if (this.userRole === 'farmer') {
      this.userIsSuperUser = false;
      console.log(this.userIsSuperUser);

      this.userRoleListener.next(false);
    }
    return this.userIsSuperUser;
  }

  getToken() {
    return of(this.token);
    // return this.token;
  }

  signIn(signInForm) {
    return this.http.post<{
      token: string;
      _id: string;
      expiresIn: number;
      user: any;
    }>('http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/farmers/signin', signInForm);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userIsSuperUser = true;
      this.setAuthTimer(expiresIn / 1000);

      this.authStatusListener.next(true);
      // this.userRoleListener.next(true);
      this.getIsSuper();
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userIsSuperUser = false;
    this.userId = null;
    this.userRole = null;
    this.authStatusListener.next(false);
    this.userRoleListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  private setAuthTimer(tokenDuration: number) {
    // console.log('setting timer:' + tokenDuration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, tokenDuration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userRole', this.userRole);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('role');
  }
  //getting the token and expiration datae from the
  //local storage and auto login the user without needing
  //to login again
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      // userId: userId,
    };
  }
}
