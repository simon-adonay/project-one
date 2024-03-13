import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public imageUplaod(image: File) {
    return this.http.post<any>(
      'http://meansackfarmers-env-1.eba-ecdjdt3p.ap-northeast-2.elasticbeanstalk.com/image',
      image
    );
  }
}
