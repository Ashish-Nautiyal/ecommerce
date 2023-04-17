import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  currentUser: any;
  cart: any = [];
  cartTotal: any;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCartData();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('email');
  }


  getCartData() {
    this.cartService.getCart({ user: this.currentUser }).subscribe(
      (res) => {
        this.cart = res.data;
        this.cartTotal = res.total;
      }, (error) => {
        console.log(error);
      }
    )
  }


  increase(val: any) {
    this.cartService.increaseCart({ user: this.currentUser, variant_id: val._id, price: val.price }).subscribe(
      (res) => {
        this.getCartData();
      }, (error) => {
        console.log(error);
      }
    )
  }


  decrease(val: any) {
    this.cartService.decreaseCart({ user: this.currentUser, variant_id: val._id, price: val.price }).subscribe(
      (res) => {
        this.getCartData();
      }, (error) => {
        console.log(error);
      }
    )
  }


  removeCart(val: any) {
    this.cartService.removeCart({ user: this.currentUser, variant_id: val._id }).subscribe(
      (res) => {
        this.getCartData();
      }, (error) => {
        console.log(error);

      }
    )
  }
}