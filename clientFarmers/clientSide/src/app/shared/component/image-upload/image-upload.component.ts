import { UploadService } from './../upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  constructor(private uploadService: UploadService) {}

  ngOnInit() {


  }
}
