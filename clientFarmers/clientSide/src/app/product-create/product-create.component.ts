import { UploadService } from './../shared/component/upload.service';
import { FarmerService } from './../farmer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  template: `
    <mat-card>
      <form
        class="newProduct"
        [formGroup]="newProduct"
        (ngSubmit)="onAddProduct()"
      >
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input
            matInput
            type="text"
            name="name"
            required
            minlength="3"
            placeholder="Product Name"
            formControlName="name"
          />
          <!-- <mat-error *ngIf="newProduct.invalid"
            >Please enter a product title.</mat-error
          > -->
        </mat-form-field>
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
          />
        </mat-form-field>
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
          />
        </mat-form-field>

        <mat-form-field>
          <textarea
            matInput
            rows="4"
            name="content"
            required
            placeholder="Product Description"
            formControlName="description"
          ></textarea>
        </mat-form-field>
        <button
          mat-raised-button
          color="accent"
          type="submit"
          [disabled]="!newProduct.valid"
        >
          Add Product
        </button>
      </form>

      <div>
        <label label class="btn btn-default">
          <input type="file" (change)="selectFile($event)" />
        </label>
        <button class="btn btn-success" (click)="imageUploading()">
          Upload
        </button>
      </div>
   
  `,

  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  images: FileList;
  image: File;
  selectedFile;
  farmerId: any;
  newProduct: FormGroup;
  frm;
  data;
  // newProduct = 'NO CONTENT';

  constructor(
    private farmerService: FarmerService,
    public formBuilder: FormBuilder,
    public uploadImage: UploadService
  ) {
    this.newProduct = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: [''],
      description: [''],
    });
  }

  selectFile(event) {
    console.log(event.target.files);
    this.image = event.target.files[0];
    console.log(this.images, 'this.images');
  }

  onAddProduct = () => {
    this.imageUploading();

    console.log(this.newProduct.value);

    this.farmerService.postProduct(this.newProduct.value).subscribe((data) => {
      console.log(data);
    });
  };

  imageUploading() {
    // console.log(this.images);
    // this.image = this.images.item(0);
    // console.log(this.image, 'this.images');

    this.farmerService.storeInbucket(this.image).subscribe((data: any) => {
      this.data = data;
      console.log(data);

      this.newProduct.patchValue({ imageUrl: data.keyname });

      console.log(data.keyname, 'data.keyname');
      // console.log(this.data.body);
    });
  }

  ngOnInit() {
    // this.onAddProduct();
    // this.farmerService.postProduct(this.newProduct.value).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
