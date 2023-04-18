import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddToCartComponent } from './products/add-to-cart/add-to-cart.component';
import { DisplayCategoryComponent } from './products/display-category/display-category.component';
import { DisplayProductComponent } from './products/display-product/display-product.component';
import { ImageDialogComponent } from './products/image-dialog/image-dialog.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { SearchResultComponent } from './products/search-result/search-result.component';
import { WishlistComponent } from './products/wishlist/wishlist.component';
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
      { path: 'displayCategory', component: DisplayCategoryComponent },
      { path: 'display-product', component: DisplayProductComponent },
      { path: 'productDetail', component: ProductDetailComponent },
      { path: 'imageDialog', component: ImageDialogComponent },
      { path: 'searchResult', component: SearchResultComponent },
      { path: 'addToCart', component: AddToCartComponent },
      { path: 'wishList', component: WishlistComponent },
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