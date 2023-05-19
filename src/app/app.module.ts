import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { MaterialModule } from './material/material.module'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JwtInterceptorInterceptor } from './jwtInterceptor/jwt-interceptor.interceptor';
 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UserModule,
    AdminModule,
    ProductsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }