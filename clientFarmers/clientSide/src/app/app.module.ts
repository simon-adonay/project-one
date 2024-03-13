import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './farmers/registration/signin/signin.component';
import { SignupComponent } from './farmers/registration/signup/signup.component';
import { httpInterceptor } from './farmers/registration/signup/http-interceptor';
import { ImageUploadComponent } from './shared/component/image-upload/image-upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthHeaderComponent } from './farmers/auth-header/auth-header.component';
import { OrderListComponent } from './Orders/order-list/order-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    SigninComponent,
    SignupComponent,
    ImageUploadComponent,
    AuthHeaderComponent,
    OrderListComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
