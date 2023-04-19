import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';
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


  getUserId() {
    let user_id;
    if (this.currentUser) {
      user_id = this.currentUser;
    } else {
      user_id = environment.data[2].ip;
    }
    return user_id;
  }

  getCartData() {
    let user_id = this.getUserId();
    this.cartService.getCart({ user: user_id }).subscribe(
      (res) => {
        this.cart = res.data;
        this.cartTotal = res.total;
      }, (error) => {
        console.log(error);
      }
    );
  }


  increase(val: any) {
    let user_id = this.getUserId();
    this.cartService.increaseCart({ user: user_id, variant_id: val._id, price: val.price }).subscribe(
      (res) => {
        this.getCartData();
      }, (error) => {
        console.log(error);
      }
    );
  }


  decrease(val: any) {
    let user_id = this.getUserId();
    this.cartService.decreaseCart({ user: user_id, variant_id: val._id, price: val.price }).subscribe(
      (res) => {
        this.getCartData();
      }, (error) => {
        console.log(error);
      }
    );
  }


  removeCart(val: any) {
    let user_id = this.getUserId();
    this.cartService.removeCart({ user: user_id, variant_id: val._id }).subscribe(
      (res) => {
        this.getCartData();
      }, (error) => {
        console.log(error);

      }
    );
  }
}