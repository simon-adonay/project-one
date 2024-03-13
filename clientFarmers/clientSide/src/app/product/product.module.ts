import { HeaderComponent } from './../header/header.component';
import { CustomerListComponent } from './../super-user/customer-list/customer-list.component';
import { FarmersListComponent } from './../super-user/farmers-list/farmers-list.component';
import { OrdersComponent } from './../farmers/orders/orders.component';
import { UpdateComponent } from '../update/update.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductComponent } from '../product/product.component';
// import { ProductsComponent } from '../products/products.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { AboutComponent } from '../about/about.component';
// import { CustomerListComponent } from '../super-user/customer-list/customer-list.component   ;
// import { FarmersListComponent } from '../super-user/farmers-list/farmers-list.component';
import { SuperAboutComponent } from './../super-user/superAbout/superAbout.component';
import { OrderlistComponent } from './../super-user/orderlist/orderlist.component';
import { LogFileComponent } from './../super-user/log-file/log-file.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ResetpasswordComponent } from './../super-user/resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    // ProductsComponent,
    ProductCreateComponent,
    AboutComponent,
    UpdateComponent,
    OrdersComponent,
    CustomerListComponent,
    FarmersListComponent,
    SuperAboutComponent,
    HeaderComponent,
    OrderlistComponent,
    LogFileComponent,
    ResetpasswordComponent,
  ],
  // entryComponents: [ResetpasswordComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ScrollingModule,
    RouterModule.forChild([
      {
        path: '',
        component: HeaderComponent,
        children: [
          { path: 'superFarmerList', component: FarmersListComponent },
          { path: 'superCustomerList', component: CustomerListComponent },
          { path: 'add', component: ProductCreateComponent },
          { path: 'products', component: ProductListComponent },
          { path: 'order', component: OrdersComponent },
          { path: 'update', component: UpdateComponent },
          { path: 'super', component: SuperAboutComponent },
          { path: 'superOrderList', component: OrderlistComponent },
          { path: 'LogFile', component: LogFileComponent },
          { path: 'reset', component: ResetpasswordComponent },
        ],
      },
    ]),
  ],
})
export class ProductModule {}
