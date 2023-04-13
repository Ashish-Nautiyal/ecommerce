import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { DisplayProductComponent } from './display-product/display-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';
import { DisplayVariantComponent } from './display-variant/display-variant.component';


@NgModule({
  declarations: [
    DisplayProductComponent,
    ProductDetailComponent,
    ImageDialogComponent,
    SearchResultComponent,
    AddToCartComponent,
    DisplayCategoryComponent,
    DisplayVariantComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    DisplayProductComponent
  ]
})


export class ProductsModule { }