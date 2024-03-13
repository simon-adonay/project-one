import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superAbout',
  templateUrl: './superAbout.component.html',
  styleUrls: ['./superAbout.component.css'],
})
export class SuperAboutComponent implements OnInit {
  userRole;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.userRole = this.authService.getUserRole();
    // console.log(this.userRole);
  }
}
