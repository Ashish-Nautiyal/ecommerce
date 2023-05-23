import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { HomeComponent } from './home/home.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';
import { AddShippingAddressComponent } from './add-shipping-address/add-shipping-address.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';


@NgModule({
  declarations: [
    HomeComponent,
    UpdateProfileComponent,
    ProfileComponent,
    AddShippingAddressComponent,
    MyOrdersComponent,
    MyWishlistComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent,
    UpdateProfileComponent,
    ProfileComponent
  ]
})
export class UserModule { }