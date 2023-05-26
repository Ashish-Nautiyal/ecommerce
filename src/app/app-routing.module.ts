import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AddToCartComponent } from './products/add-to-cart/add-to-cart.component';
import { CancelComponent } from './products/cancel/cancel.component';
import { CheckoutComponent } from './products/checkout/checkout.component';
import { DisplayCategoryComponent } from './products/display-category/display-category.component';
import { DisplayProductComponent } from './products/display-product/display-product.component';
import { GuestComponent } from './products/guest/guest.component';
import { ImageDialogComponent } from './products/image-dialog/image-dialog.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PurchaseComponent } from './products/purchase/purchase.component';
import { QuickSignupComponent } from './products/quick-signup/quick-signup.component';
import { SearchResultComponent } from './products/search-result/search-result.component';
import { ShippingAddressComponent } from './products/shipping-address/shipping-address.component';
import { SuccessComponent } from './products/success/success.component';
import { HomeComponent } from './user/home/home.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UpdateShippingAddressComponent } from './products/update-shipping-address/update-shipping-address.component';
import { AddShippingAddressComponent } from './user/add-shipping-address/add-shipping-address.component';
import { MyOrdersComponent } from './user/my-orders/my-orders.component';
import { MyWishlistComponent } from './user/my-wishlist/my-wishlist.component';
import { IsLoginGuard } from './guard/is-login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'user', children: [
      { path: 'quickSignUp', component: QuickSignupComponent },
      { path: 'addToCart', component: AddToCartComponent },
      { path: 'guest', component: GuestComponent },
      { path: 'imageDialog', component: ImageDialogComponent },
      { path: 'displayCategory', component: DisplayCategoryComponent },
      { path: 'display-product', component: DisplayProductComponent },
      { path: 'productDetail', component: ProductDetailComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'shippingAddress', component: ShippingAddressComponent },
      { path: 'updateShippingAddress', component: UpdateShippingAddressComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'cancel', component: CancelComponent },
      { path: 'searchResult', component: SearchResultComponent },
      
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [IsLoginGuard] },
      { path: 'updateProfile', component: UpdateProfileComponent, canActivate: [IsLoginGuard] },
      { path: 'addShippingAddress', component: AddShippingAddressComponent, canActivate: [IsLoginGuard] },
      { path: 'myOrder', component: MyOrdersComponent, canActivate: [IsLoginGuard] },
      { path: 'myWishlist', component: MyWishlistComponent, canActivate: [IsLoginGuard] },
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