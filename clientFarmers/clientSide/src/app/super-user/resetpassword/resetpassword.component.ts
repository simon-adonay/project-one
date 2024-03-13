import { Router } from '@angular/router';
import { SuperUserService } from './../super-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  template: `
    <form class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Reset-Password</mat-label>
        <input
          type="text"
          matInput
          placeholder="new password"
          value=""
          (change)="selectInput($event)"
        /><br />
      </mat-form-field>
      <button
        color="primary"
        mat-raised-button
        class="btn btn-success"
        (click)="onResetPasswordHandler()"
      >
        new Password
      </button>
    </form>
  `,
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent implements OnInit {
  farmerId;
  password;

  constructor(private superService: SuperUserService, public router: Router) {
    this.farmerId = this.router.getCurrentNavigation().extras.state.farmerId;
    console.log(this.farmerId);
  }

  selectInput(event) {
    this.password = event.target.value;
  }

  onResetPasswordHandler() {
    console.log(this.farmerId);
    console.log(this.farmerId, 'id');
    this.superService
      .resetPassWord(this.farmerId, this.password)
      .subscribe((data) => console.log(data));
  }

  ngOnInit() {}
}
