import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { DisplayProductComponent } from './display-product/display-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';


@NgModule({
  declarations: [
    DisplayProductComponent,
    ProductDetailComponent,
    ImageDialogComponent,
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