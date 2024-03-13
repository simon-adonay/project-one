import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Product } from '../app/product/product.component';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  id: string;
  private products;
  // private productsUpdated = new Subject();
  constructor(private http: HttpClient, private auth: AuthService) {}

  getId() {
    this.auth.getUserId().subscribe((data) => {
      this.id = data;
      console.log(this.id, 'farmersID');
    });

    console.log(this.id);
  }

  getProducts() {
    return this.http.get<any>(`http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/farmers`);
  }
  // postProduct(id, product) {
  //   return this.http.post<any>(`http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/farmers/${id}`, product);
  // }
  postProduct(product) {
    return this.http.patch<any>('http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/farmers', product);
    console.log(product);
  }

  deleteProduct(id, prodId) {
    return this.http.delete<any>(
      `http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/farmers/${id}/${prodId}`
    );
  }
  updatedProduct(prodId, data) {
    return this.http.patch<any>(
      `http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/farmers/${prodId}`,
      data
    );
  }

  storeInbucket(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    console.log(formdata, 'formdata, hadlkasdldsl');
    return this.http.post('http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/files', formdata);
  }

  getOrders() {
    return this.http.get('http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/orders');
  }
  statusHandler(status, orderId) {
    return this.http.patch(`http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/orders/${orderId}`, status);
  }

  getImage(file) {
    return this.http.get(`http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/files/${file}`);
  }
}
