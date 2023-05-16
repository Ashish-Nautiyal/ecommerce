import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { HomeComponent } from './home/home.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    HomeComponent,
    UpdateProfileComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductsModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    UpdateProfileComponent,
    ProfileComponent
  ]
})
export class UserModule { }