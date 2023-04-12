import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplayProductComponent } from './products/display-product/display-product.component';
import { ImageDialogComponent } from './products/image-dialog/image-dialog.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { HomeComponent } from './user/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth', component: NavbarComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'user', component: NavbarComponent, children: [
      { path: 'display-product', component: DisplayProductComponent },
      { path: 'product-detail', component: ProductDetailComponent },
      { path: 'imageDialog', component: ImageDialogComponent },


      { path: 'home', component: HomeComponent },
    ]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }