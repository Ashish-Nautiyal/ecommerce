import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingAddressService } from 'src/app/services/shipping-address.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '');
    if (!this.cart) {
      this.router.navigate(['/user/displayCategory']);
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