import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { PromocodeService } from 'src/app/services/promocode.service';
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

  subTotal: number = 0;
  total: number = 0;
  taxes: number = 0;
  promocode: any;
  discount: any;

  constructor(private router: Router, private productService: ProductService, private addressService: ShippingAddressService, private authService: AuthService, private promocodeService: PromocodeService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCart();
    this.getShippingAddress();
    this.returnSubTotalAmount();
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
    this.router.navigate(['/user/shippingAddress']);
  }

  buyNow() {
    this.productService.makePayment({ amount: this.subTotal }).subscribe(
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

  returnSubTotalAmount() {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      for (let i = 0; i < cart.length; i++) {
        this.subTotal += cart[i].price * cart[i].qty;

        let taxAmount = (cart[i].price * cart[i].tax) / 100;
        this.taxes += taxAmount * cart[i].qty;
      }
      this.total = this.subTotal + this.taxes;
    }
  }

  applyPromocode() {
    if (this.currentUser) {
      this.promocodeService.applyPromocode({ user: this.currentUser, promocode: this.promocode }).subscribe(
        res => {
          console.log('res', res);
          if (res.data) {
            console.log('total', this.total);
            this.discount = (this.total * res.data) / 100;
            console.log('total1', this.total);
            console.log('discount', this.discount);

            this.total = this.total - this.discount;
            console.log('total2', this.total);
          }
        }, error => console.log(error)
      );
    }
  }
}