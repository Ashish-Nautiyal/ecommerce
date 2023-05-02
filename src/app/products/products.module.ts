import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { DisplayProductComponent } from './display-product/display-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { GuestComponent } from './guest/guest.component';
import { QuickSignupComponent } from './quick-signup/quick-signup.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';


@NgModule({
  declarations: [
    DisplayProductComponent,
    ProductDetailComponent,
    ImageDialogComponent,
    SearchResultComponent,
    AddToCartComponent,
    DisplayCategoryComponent,
    WishlistComponent,
    PurchaseComponent,
    OrderDetailComponent,
    GuestComponent,
    QuickSignupComponent,
    CheckoutComponent,
    ShippingAddressComponent,
    SuccessComponent,
    CancelComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DisplayProductComponent,
    ProductDetailComponent,
    ImageDialogComponent,
    SearchResultComponent,
    AddToCartComponent,
    DisplayCategoryComponent,
    WishlistComponent,
    PurchaseComponent,
    OrderDetailComponent,
    GuestComponent,
    QuickSignupComponent,
    CheckoutComponent,
    ShippingAddressComponent,
  ]
})


export class ProductsModule { }