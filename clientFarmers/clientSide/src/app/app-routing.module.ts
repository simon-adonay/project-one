import { HeaderComponent } from './header/header.component';
import { CheckGuard } from './check.guard';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './farmers/registration/signin/signin.component';
import { SignupComponent } from './farmers/registration/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'farmer',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
    canActivate: [CheckGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CheckGuard],
})
export class AppRoutingModule {}
