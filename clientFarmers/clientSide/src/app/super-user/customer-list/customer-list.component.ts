import { SuperUserService } from './../super-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['CustomerId', 'Email', 'account'];

  public customers;
  customer;
  obj: any;
  constructor(private superService: SuperUserService) {}

  activateCustomer(status, id) {
    if (status == true) {
      this.obj = { disabled: false };
    }
    if (status == false) {
      this.obj = { disabled: true };
      console.log(this.obj);
    }
    this.superService.updateCustomerAccount(id, this.obj).subscribe((data) => {
      console.log(this.customers);
    });
  }

  ngOnInit() {
    this.superService.getCustomersList().subscribe((data) => {
      this.customers = data;
      console.log(this.customers);
    });

    // this.superService.updateCustomerAccount(this.customer).subscribe((data) => {
    //   this.customer = data;
    // });
  }
}
