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
  currentUser: any;
  // shippingAddress: any = [];
  // isChildComponentRendered: boolean = false;

  constructor(private router: Router, private addressService: ShippingAddressService) { }

  ngOnInit() {
    // this.getCurrentUser();
    // this.getShippingAddress();
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

  // getCurrentUser() {
  //   this.currentUser = localStorage.getItem('user');
  // }

  // getShippingAddress() {
  //   this.addressService.getShippingAddress({ user: this.currentUser }).subscribe(
  //     (res) => {
  //       this.shippingAddress = res.data;
  //     }, (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // showAddressForm() {
  //   this.isChildComponentRendered = true;
  // }

  // closeAddressForm(event: any) {
  //   if (this.currentUser) {
  //     this.isChildComponentRendered = event;
  //     this.getCurrentUser();
  //     this.getShippingAddress();
  //   } else {
  //     if (localStorage.getItem('address')) {
  //       this.router.navigate(['/user/purchase']);
  //     } else {
  //       this.isChildComponentRendered = event;     
  //     }
  //   }
  // }

  back() {

  }

  next() {
    this.router.navigate(['/user/shippingAddress']);
  }
}