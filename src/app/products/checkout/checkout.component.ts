import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '');
    } else {
      this.back();
    }
  }

  increaseQuantity(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    cart[i].qty = cart[i].qty + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.ngOnInit();
  }

  decreaseQuantity(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    cart[i].qty = cart[i].qty - 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.ngOnInit();
  }

  removeProduct(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    cart.splice(i, 1);
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.ngOnInit();
    } else {
      localStorage.removeItem('cart');
      this.router.navigate(['/user/displayCategory']);
    }
  }

  back() {
    this.router.navigate(['/user/displayCategory']);
  }

  next() {
    this.router.navigate(['/user/shippingAddress']);
  }
}