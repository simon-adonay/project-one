import { SuperUserService } from './../super-user.service';
import { Component, OnInit } from '@angular/core';
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-orderlist',
  template: `
    <mat-list>
      <div mat-subheader>All Orders</div>
      <mat-list-item *ngFor="let folder of orderList">
        <mat-icon mat-list-icon>folder</mat-icon>
        <div mat-line>OrderId:{{ folder._id }}</div>
        <div mat-line>{{ folder.time | date }}</div>
      </mat-list-item>
  `,
  // './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent implements OnInit {
  orderList;
  constructor(private superService: SuperUserService) {}

  ngOnInit() {
    this.superService.getOrderList().subscribe((data) => {
      this.orderList = data;
      console.log(this.orderList);
    });
  }
}
