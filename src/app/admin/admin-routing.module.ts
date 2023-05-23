import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddVariantComponent } from './add-variant/add-variant.component';
import { AddVariantAttributeComponent } from './add-variant-attribute/add-variant-attribute.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RoleGuard } from '../guard/role.guard';
import { DisplayCategoryComponent } from '../products/display-category/display-category.component';

import { ListCategoryComponent } from './list-category/list-category.component';
import { ListSubcategoryComponent } from './list-subcategory/list-subcategory.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListVariantComponent } from './list-variant/list-variant.component';
import { ListAttributeComponent } from './list-attribute/list-attribute.component';

const appRoutes: Routes = [
    {
        path: '', component: NavbarComponent, canActivate: [RoleGuard], children: [
            {
                path: 'admin-dashboard', component: AdminDashboardComponent, children: [
                    { path: '', component: DisplayCategoryComponent },
                    { path: 'add-category', component: AddCategoryComponent },
                    { path: 'add-sub-category', component: AddSubcategoryComponent },
                    { path: 'add-product', component: AddProductComponent },
                    { path: 'add-variant', component: AddVariantComponent },
                    { path: 'add-attribute', component: AddVariantAttributeComponent },
                    { path: 'listCategory', component: ListCategoryComponent },
                    { path: 'listSubCategory', component: ListSubcategoryComponent },
                    { path: 'listProduct', component: ListProductComponent },
                    { path: 'listVariant', component: ListVariantComponent },
                    { path: 'listAttribute', component: ListAttributeComponent },
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }