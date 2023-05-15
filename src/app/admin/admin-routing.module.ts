import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddVariantComponent } from './add-variant/add-variant.component';
import { RoleGuard } from '../guard/role.guard';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddVariantAttributeComponent } from './add-variant-attribute/add-variant-attribute.component';
import { DisplayCategoryComponent } from '../products/display-category/display-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListVariantComponent } from './list-variant/list-variant.component';

const appRoutes: Routes = [
    {
        path: '', component: NavbarComponent, children: [
            {
                path: 'admin-dashboard', component: AdminDashboardComponent, children: [
                    { path: '', component: DisplayCategoryComponent, canActivate: [RoleGuard] },
                    { path: 'add-category', component: AddCategoryComponent, canActivate: [RoleGuard] },
                    { path: 'add-sub-category', component: AddSubcategoryComponent, canActivate: [RoleGuard] },
                    { path: 'add-product', component: AddProductComponent, canActivate: [RoleGuard] },
                    { path: 'add-variant', component: AddVariantComponent, canActivate: [RoleGuard] },
                    { path: 'add-attribute', component: AddVariantAttributeComponent, canActivate: [RoleGuard] }, 
                    { path: 'listCategory', component: ListCategoryComponent, canActivate: [RoleGuard] },
                    { path: 'listProduct', component: ListProductComponent, canActivate: [RoleGuard] },
                    { path: 'listVariant', component: ListVariantComponent, canActivate: [RoleGuard] },

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