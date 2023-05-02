import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddToCartComponent } from './products/add-to-cart/add-to-cart.component';
import { CancelComponent } from './products/cancel/cancel.component';
import { CheckoutComponent } from './products/checkout/checkout.component';
import { DisplayCategoryComponent } from './products/display-category/display-category.component';
import { DisplayProductComponent } from './products/display-product/display-product.component';
import { GuestComponent } from './products/guest/guest.component';
import { ImageDialogComponent } from './products/image-dialog/image-dialog.component';
import { OrderDetailComponent } from './products/order-detail/order-detail.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PurchaseComponent } from './products/purchase/purchase.component';
import { QuickSignupComponent } from './products/quick-signup/quick-signup.component';
import { SearchResultComponent } from './products/search-result/search-result.component';
import { ShippingAddressComponent } from './products/shipping-address/shipping-address.component';
import { SuccessComponent } from './products/success/success.component';
import { WishlistComponent } from './products/wishlist/wishlist.component';
import { HomeComponent } from './user/home/home.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';

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
      { path: 'purchase', component: PurchaseComponent },
      { path: 'guest', component: GuestComponent },
      { path: 'quickSignUp', component: QuickSignupComponent },
      { path: 'updateProfile', component: UpdateProfileComponent },
      { path: 'shippingAddress', component: ShippingAddressComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'order', component: OrderDetailComponent },
      { path: 'home', component: HomeComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'cancel', component: CancelComponent },
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