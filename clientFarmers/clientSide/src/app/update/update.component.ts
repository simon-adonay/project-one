import { FarmerService } from './../farmer.service';
import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  template: `
    <mat-card>
      <form
        class="newProduct"
        [formGroup]="updateProduct"
        (ngSubmit)="onEditProduct()"
      >
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input
            matInput
            type="text"
            value="ggsgssgs"
            required
            minlength="3"
            placeholder="Product Name"
            formControlName="name"
          />
          <!-- <mat-error *ngIf="newProduct.invalid"
            >Please enter a product title.</mat-error
          > --> </mat-form-field
        ><br />
        <mat-form-field>
          <mat-label>Quantity</mat-label>
          <input
            matInput
            type="number"
            name="quantity"
            required
            minlength="3"
            placeholder="Product quantity"
            formControlName="quantity"
          /> </mat-form-field
        ><br />
        <mat-form-field>
          <mat-label>Price</mat-label>
          <input
            matInput
            type="number"
            name="price"
            required
            minlength="3"
            placeholder="Product price"
            formControlName="price"
          /> </mat-form-field
        ><br />
        <mat-form-field>
          <mat-label>imageUrl</mat-label>
          <input
            matInput
            type="string"
            name="imageUrl"
            required
            placeholder="image"
            formControlName="imageUrl"
          /> </mat-form-field
        ><br />

        <mat-form-field>
          <textarea
            matInput
            rows="4"
            name="content"
            required
            placeholder="Product Description"
            formControlName="description"
          ></textarea></mat-form-field
        ><br />
        <button
          mat-raised-button
          color="accent"
          type="submit"
          [disabled]="!updateProduct.valid"
        >
          Edit Product
        </button>
      </form>
    </mat-card>
  `,

  // templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  farmerId: any;
  updateProduct: FormGroup;
  data;
  id;
  prodId;

  // newProduct = 'NO CONTENT';

  constructor(
    private router: Router,
    private farmerService: FarmerService,
    public formBuilder: FormBuilder
  ) {
    this.data = this.router.getCurrentNavigation().extras.state.data;
    console.log(this.data, 'data navigated to be updated');

    this.updateProduct = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      quantity: [this.data.quantity, Validators.required],
      price: [this.data.price, Validators.required],
      imageUrl: [this.data.imageUrl, Validators.required],
      description: [this.data.description],
    });
  }
  onEditProduct() {
    console.log(this.updateProduct.value);
    // if (this.newProduct.invalid) {
    //   return;
    // }
    console.log(this.updateProduct.value);
    this.farmerService
      .updatedProduct(this.data._id, this.updateProduct.value)
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnInit(): void {}
}
