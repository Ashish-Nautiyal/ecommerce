import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ShippingAddressService } from 'src/app/services/shipping-address.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  currentUser: any;
  cart: any = [];
  shippingAddress: any = [];
  total: number = 0;

  constructor(private router: Router, private productService: ProductService, private addressService: ShippingAddressService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCart();
    this.getShippingAddress();
    this.returnTotalAmount();
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    const token: any = this.authService.getAuthToken();
    const decoded = helper.decodeToken(token);
    if (decoded) {
      this.currentUser = decoded.user;
    }
  }

  getCart() {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '');
    }
  }

  getShippingAddress() {
    if (this.currentUser) {
      this.addressService.getdefaultAddress({ user: this.currentUser }).subscribe(
        (res) => {
          this.shippingAddress = res.data;
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      if (localStorage.getItem('address')) {
        let array = [];
        array.push(JSON.parse(localStorage.getItem('address') || ''));
        this.shippingAddress = array;
      }
    }
  }

  back() {
    this.router.navigate(['/user/shippingAddress'])
  }

  buyNow() {
    this.productService.makePayment({ amount: this.total }).subscribe(
      (res) => {
        window.location.href = res.url;
      }, (error) => {
        console.log(error);
      }
    );
  }

  editProduct() {
    this.router.navigate(['/user/checkout']);
  }

  returnTotalAmount() {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      for (let i = 0; i < cart.length; i++) {
        this.total += cart[i].price * cart[i].qty;
      }
    }
  }
}