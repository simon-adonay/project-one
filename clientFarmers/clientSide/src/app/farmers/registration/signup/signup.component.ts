import { FarmerService } from './../../../farmer.service';
import { AuthService } from './../../../auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/shared/component/upload.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  signUpForm: FormGroup;
  token;
  images: FileList;
  image: File;
  selectedFile;
  data;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public farmerService: FarmerService,
    public uploadingImage: UploadService
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['farmer'],
      disabled: [false],
      company: [''],
      imageUrl: [''],
    });
  }

  selectFile(event) {
    console.log(event.target.files);
    this.image = event.target.files[0];
    console.log(this.images, 'this.images');
  }

  onAddProduct = () => {
    this.imageUploading();

    console.log(this.signUpForm.value);

    this.farmerService.postProduct(this.signUpForm.value).subscribe((data) => {
      console.log(data);
    });
  };

  onSubmit() {
    this.isLoading = true;

    if (this.signUpForm.invalid) {
      return;
    }
    this.isLoading = true;

    // console.log(this.signUpForm.value, 'formgroup');
    this.auth.signUp(this.signUpForm.value).subscribe((data) => {
      // this.auth.mytoken(data);
      // console.log(data.Authorization, 'signup');
    });
    this.isLoading = false;

    this.signUpForm.reset();
  }

  imageUploading() {
    // console.log(this.images);
    // this.image = this.images.item(0);
    // console.log(this.image, 'this.images');

    this.farmerService.storeInbucket(this.image).subscribe((data: any) => {
      this.data = data;
      console.log(data);

      this.signUpForm.patchValue({ imageUrl: data.keyname });

      console.log(data.keyname, 'data.keyname');
      // console.log(this.data.body);
    });
  }

  ngOnInit(): void {}
}
