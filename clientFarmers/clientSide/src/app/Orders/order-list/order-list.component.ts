import { SuperUserService } from './../../super-user/super-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList;
  constructor(public superService: SuperUserService) { }

  ngOnInit() {
   
  }
  }


