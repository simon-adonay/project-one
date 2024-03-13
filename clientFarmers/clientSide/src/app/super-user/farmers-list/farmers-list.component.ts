import { Router } from '@angular/router';
import { SuperUserService } from './../super-user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-farmers-list',
  templateUrl: './farmers-list.component.html',
  styleUrls: ['./farmers-list.component.css'],
})
export class FarmersListComponent implements OnInit {
  animal: string;
  name: string;
  displayedColumns: string[] = [
    'FarmerId',
    'Email',
    'account',
    'reset-password',
  ];
  public farmers: any;
  public onlyFarmers;
  farmer;
  obj;
  farmerId;
  password;
  constructor(private superService: SuperUserService, public router: Router) {}

  activityDisplay() {}

  activateFarmer(status, id) {
    if (status == true) {
      this.obj = { disabled: false };
    }
    if (status == false) {
      this.obj = { disabled: true };
    }
    this.superService.updateFarmerAccount(id, this.obj).subscribe((data) => {
      console.log(this.farmers, 'dddd');
    });
  }

  resetPassword(farmerId) {
    console.log(farmerId);
    this.router.navigate(['farmer', 'reset'], {
      state: { farmerId: farmerId },
    });
  }

  ngOnInit() {
    this.superService.getFarmersList().subscribe((data) => {
      this.farmers = data;

      this.farmers = this.farmers.filter((farmer) => {
        return farmer.role !== 'superuser';
      });
      console.log(this.farmers);
      this.farmers;
    });
  }
}
