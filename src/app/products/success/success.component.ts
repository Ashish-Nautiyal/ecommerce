import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShippingAddressService } from 'src/app/services/shipping-address.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  currentUser: any;
  shippingAddress: any = [];

  constructor(private orderService: OrderService, private router: Router, private addressService: ShippingAddressService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getShippingAddress();
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    const token: any = this.authService.getAuthToken();
    const decoded = helper.decodeToken(token);
    if (decoded) {
      this.currentUser = decoded.user;
    }
  }

  getShippingAddress() {
    if (this.currentUser) {
      this.addressService.getdefaultAddress({ user: this.currentUser }).subscribe(
        (res) => {
          this.shippingAddress = res.data;
          console.log('shsssssssss', this.shippingAddress);
          this.orderSave();
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

  orderSave() {
    if (this.currentUser) {
      if (localStorage.getItem('cart')) {
        let product = JSON.parse(localStorage.getItem('cart') || '');
        console.log('gggg', product);
        console.log('shippping Address', this.shippingAddress);

        this.orderService.saveOrder({ product: product, user: this.shippingAddress[0].user, shippingAddress: this.shippingAddress[0]._id }).subscribe(
          (res) => {
            localStorage.removeItem('cart');
            localStorage.removeItem('address');
          }, (error) => {
            console.log(error);
          }
        );
      } else {
        this.router.navigate(['/user/displayCategory']);
      }
    } else {
      if (localStorage.getItem('address')) {
        let address = JSON.parse(localStorage.getItem('address') || '');
        this.addressService.addShippingAddress(address).subscribe(
          res => {
          
          }, error =>
          console.log(error)
        );
      } else {
        this.router.navigate(['/user/displayCategory']);
      }
    }
  }
}