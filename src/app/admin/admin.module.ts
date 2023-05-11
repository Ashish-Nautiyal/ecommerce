import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddVariantComponent } from './add-variant/add-variant.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddVariantAttributeComponent } from './add-variant-attribute/add-variant-attribute.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ListSubcategoryComponent } from './list-subcategory/list-subcategory.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListVariantComponent } from './list-variant/list-variant.component';
import { ListAttributeComponent } from './list-attribute/list-attribute.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddVariantComponent,
    AddSubcategoryComponent,
    AddVariantAttributeComponent,
    ListCategoryComponent,
    ListSubcategoryComponent,
    ListProductComponent,
    ListVariantComponent,
    ListAttributeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    MaterialModule
  ],
  exports: [
    AdminDashboardComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddVariantComponent,
    AddSubcategoryComponent,
    AddVariantAttributeComponent,
    ListCategoryComponent,
  ]
})

export class AdminModule { }