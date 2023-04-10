import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { DisplayProductComponent } from './display-product/display-product.component';


@NgModule({
  declarations: [
    DisplayProductComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DisplayProductComponent
  ]
})


export class ProductsModule { }