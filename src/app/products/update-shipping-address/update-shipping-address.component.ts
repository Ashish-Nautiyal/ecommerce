import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingAddressService } from 'src/app/services/shipping-address.service';

@Component({
  selector: 'app-update-shipping-address',
  templateUrl: './update-shipping-address.component.html',
  styleUrls: ['./update-shipping-address.component.scss']
})
export class UpdateShippingAddressComponent implements OnInit {

  currentUser: any;
  address: any = {
    _id: '',
    user: '',
    country: '',
    state: '',
    city: '',
    street: '',
    pincode: '',
    phone_number: '',
    type: ''
  };

  constructor(private router: Router, private activateRoute: ActivatedRoute, private addressService: ShippingAddressService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAddress();
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }

  getAddress() {
    let id;
    let action;
    this.activateRoute.queryParams.subscribe(
      (params) => {
        id = params['id'];
        action = params['action'];
      }
    );
    if (id) {
      this.addressService.getShippingAddressById({ _id: id }).subscribe(
        (res) => {
          this.address = res.data;
        }, (error) => {
          console.log(error);
        }
      );
    } else if (action) {
      if (localStorage.getItem('address')) {
        this.address = JSON.parse(localStorage.getItem('address') || '');
      } else {
        this.cancel();
      }
    } else {
      this.cancel();
    }
  }

  updateAddress() {
    if (this.currentUser) {
      this.addressService.updateShippingAddress(this.address).subscribe(
        (res) => {
          this.cancel();
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      localStorage.setItem('address', JSON.stringify(this.address));
      this.cancel();
    }
  }

  cancel() {
    this.router.navigate(['/user/shippingAddress']);
  }
}