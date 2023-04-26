import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  currentUser: any;
  cart: any = [];
  quantity: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCartData();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }


  getCartData() {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '');     
      for (let i = 0; i < this.cart.length; i++) {
        this.quantity[i] = this.cart[i].qty;
      }
    } else {
      this.cart = [];
    }
  }


  increaseCart(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');   
    this.quantity[i] = this.quantity[i] + 1;
    cart[i].qty = this.quantity[i];
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getCartData();
  }


  decreaseCart(i: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    this.quantity[i] = this.quantity[i] - 1;
    cart[i].qty = this.quantity[i];
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getCartData();
  }


  removeCart(val: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '');
    var index = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i]._id == val._id) {
        index = i;
        break;
      }
    }
    cart.splice(index, 1);
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.getCartData();
    } else {
      localStorage.removeItem('cart');
      this.getCartData();
    }
  }
}