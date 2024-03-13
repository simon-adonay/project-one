import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(farmerId) {
    return this.http.get(`http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/orders/${farmerId}`);
  }

  statusHandler(status, orderId) {
    return this.http.patch(`http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/orders/${orderId}`, status);
  }
}
