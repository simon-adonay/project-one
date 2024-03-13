import { FarmerService } from './../../../farmer.service';
import { AuthService } from './../../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  isLoading = false;
  signInForm: FormGroup;
  token;
  role;
  // isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private farmService: FarmerService,
    private route: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.auth.signIn(this.signInForm.value).subscribe((data) => {
      // console.log(data, 'response from signin');
      // console.log(data.user.role, 'need to see the role');
      this.role = data.user.role;
      this.auth.storeToken(data);

      // if (data.user.role == "superuser") {

      // }

      this.route.navigate(['', 'farmer']);
    });

    console.log(this.signInForm.value);
    const val = this.signInForm.value;
    this.isLoading = false;

    this.signInForm.reset();
  }

  navigateRole() {
    this.route.navigateByUrl('/header', {
      state: { role: this.role },
    });
  }
  ngOnInit() {
    this.auth.getToken().subscribe((data) => {
      this.token = data;
    });
  }
  ngOnDestroy() {}
}
