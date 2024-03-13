import { FarmerService } from './../../farmer.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Orders/orders.service';
///
import { MatCardModule } from '@angular/material/card';
///
@Component({
  selector: 'app-orders',
  template: `
    <!-- <div>
      <mat-grid-list cols="1" rowHeight="8:0.4" *ngFor="let order of orders">
        <mat-grid-tile
          >OrderId:{{ order._id }}- {{ order.status }}
          <button
            value="ready"
            color="primary"
            (click)="onStatusHandler(readyTag, order._id)"
            #readyTag
          >
            Ready
          </button>
          <button
            value="complete"
            color="primary"
            (click)="onStatusHandler(completeTag, order._id)"
            #completeTag
          >
            Complete
          </button>
        </mat-grid-tile> -->
    <!-- <mat-grid-tile>2</mat-grid-tile>
        <mat-grid-tile>3</mat-grid-tile>
        <mat-grid-tile>4</mat-grid-tile> -->
    <!-- </mat-grid-list>
    </div> -->
    <div class="cardContainer">
      <mat-card class="productList" *ngFor="let order of statusOrdered">
        <mat-card-header>
          <div mat-card-avatar class="cardContainer"></div>
          <mat-card-title>{{ order.status }}</mat-card-title>
          <mat-card-subtitle> Order ID</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>{{ order._id }} </mat-card-content>
        <mat-card-actions>
          <button
            value="ready"
            color="primary"
            (click)="onStatusHandler(readyTag, order._id)"
            #readyTag
          >
            Ready
          </button>
          <button
            value="complete"
            color="primary"
            (click)="onStatusHandler(completeTag, order._id)"
            #completeTag
          >
            Complete
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,

  // templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderStatus;
  orders;
  order;
  orderId;
  constructor(private OrderService: OrdersService) {}
  farmerId;
  statusOrdered;

  onStatusHandler(tag, orderId) {
    console.log(tag.value);

    let statusSwitcher;

    if (tag.value === 'ready') {
      statusSwitcher = { status: 'ready' };
      // this.orderStatus = 'ready';
    }
    if (tag.value === 'complete') {
      statusSwitcher = { status: 'complete' };
    }

    this.OrderService.statusHandler(statusSwitcher, orderId).subscribe(
      (data) => {
        console.log(data, 'status from backened');
      }
    );
  }
  sortbyStatus = (a, b) => {
    const orderA = a.status;
    const orderB = b.status;
    let comparision = 0;
    if (orderA > orderB) {
      comparision = 1;
    } else if (orderA < orderB) {
      comparision = -1;
    }
    return comparision;
  };

  ngOnInit() {
    this.farmerId = localStorage.getItem('userId');
    console.log(this.farmerId);
    this.OrderService.getOrders(this.farmerId).subscribe((data) => {
      this.orders = data;
      this.statusOrdered = this.orders.sort(this.sortbyStatus);
      console.log(this.statusOrdered, 'sorted');
      console.log(this.orders);

      console.log(this.orders[0]._id, 'orderID');
      // console.log(this.orders.status, 'status');
      // console.log(this.orders[1].product[4].totalPrice, 'product');
    });
  }
}
