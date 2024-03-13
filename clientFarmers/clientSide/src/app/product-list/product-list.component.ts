import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { FarmerService } from './../farmer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',

  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  fileUpload;
  products: any;
  data: any;
  farmerId;
  id;
  product;
  authStatusSub: Subscription;
  postProduct: Subscription;
  userIsAuthenticated = false;
  constructor(
    private farmerService: FarmerService,
    private router: Router,
    private auth: AuthService
  ) {}

  onHandleDelete(farmerId, id) {
    
    this.farmerService.deleteProduct(this.farmerId, id).subscribe((res) => {
      console.log(res);
      this.id = res.id;
    });

    this.product = this.products.filter((prod) => prod._id != id);

  }

  editProduct(product) {
    this.router.navigate(['farmer', 'update'], {
      state: { data: product },
    });
  }

  ngOnInit() {
    this.farmerService.getImage(this.fileUpload).subscribe((data) => {
      console.log(data);
    });
    this.postProduct = this.farmerService.getProducts().subscribe((data) => {
      this.products = data.products;
      this.farmerId = data._id;
      console.log(this.products, this.farmerId);
    });
    this.userIsAuthenticated = this.auth.getIsAuth();
    this.authStatusSub = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.postProduct.unsubscribe();
  }
}
