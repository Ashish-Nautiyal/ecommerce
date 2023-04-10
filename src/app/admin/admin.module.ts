import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddVariantComponent } from './add-variant/add-variant.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { TreeDataComponent } from './tree-data/tree-data.component';
import { AddVariantAttributeComponent } from './add-variant-attribute/add-variant-attribute.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddVariantComponent,
    AddSubcategoryComponent,
    TreeDataComponent,
    AddVariantAttributeComponent,
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
    AddSubcategoryComponent
  ]
})

export class AdminModule { }