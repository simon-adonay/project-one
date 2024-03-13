import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SuperUserService {
  constructor(private http: HttpClient, private router: Router) {}

  getFarmersList() {
    return this.http.get('http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/super/farmer');
  }
  getCustomersList() {
    return this.http.get('http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/super/customer');
  }

  getOrderList() {
    return this.http.get('http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/orders');
  }

  getLogList() {
    return this.http.get('http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/super/log');
  }

  updateFarmerAccount(farmerId, account) {
    return this.http.patch(
      `http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/super/farmer/${farmerId}`,
      account
    );
  }

  updateCustomerAccount(customerId, account) {
    return this.http.patch(
      `http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/super/customer/${customerId}`,
      account
    );
  }

  resetPassWord(farmerId, password) {
    console.log(farmerId, 'in super service')
    return this.http.patch(
      `http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/super/farmers/${farmerId}`,
      password
    );
  }
}
