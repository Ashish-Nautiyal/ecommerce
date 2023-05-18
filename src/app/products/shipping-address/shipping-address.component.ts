import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/app/enviroments/enviroment';
import { ShippingAddressService } from 'src/app/services/shipping-address.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})

export class ShippingAddressComponent implements OnInit {

  addressForm: any;
  currentUser: any;
  userId: any;
  form: boolean = false;
  shippingAddress: any = [];

  constructor(public dialog: MatDialog, private router: Router, private addressService: ShippingAddressService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getUserId();
    this.getForm();
    this.getShippingAddress();
    if (!this.currentUser && this.shippingAddress.length < 1) {
      this.form = true;
    }
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }

  getUserId() {
    if (this.currentUser) {
      this.userId = this.currentUser;
    } else {
      this.userId = environment.data[2].ip;
    }
  }

  getForm() {
    this.addressForm = new FormGroup({
      user: new FormControl(this.userId, Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.currentUser) {
      this.addressService.addShippingAddress(this.addressForm.value).subscribe(
        (res) => {
          console.log('address', this.addressForm.value);
          this.hideForm();
          this.getShippingAddress();
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      localStorage.setItem('address', JSON.stringify(this.addressForm.value));
      this.hideForm();
      this.getShippingAddress();
    }
  }

  getShippingAddress() {
    if (this.currentUser) {
      this.addressService.getShippingAddress({ user: this.currentUser }).subscribe(
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
      } else {
        this.shippingAddress = [];
      }
    }
  }

  editAddress(event: any) {
    if (this.currentUser) {
      this.router.navigate(['/user/updateShippingAddress'], { queryParams: { id: event } });
    } else {
      if (localStorage.getItem('address')) {
        this.router.navigate(['/user/updateShippingAddress'], { queryParams: { action: 'edit' } });
      }
    }
  }

  deleteAddress(event: any) {
    if (this.currentUser) {
      this.addressService.deleteShippingAddress(event).subscribe(
        (res) => {
          this.getShippingAddress();
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      localStorage.removeItem('address');
      this.getShippingAddress();
      this.form = true;
    }
  }

  showForm() {
    this.getForm();
    this.form = true;
  }

  hideForm() {
    this.form = false;
  }

  back() {
    this.router.navigate(['/user/checkout']);
  }

  next() {
    this.router.navigate(['/user/purchase']);
  }

  setDefaultAddress(event: any) {
    if (this.currentUser) {
      this.addressService.setDefaultShippingAddress({ _id: event._id, user: event.user }).subscribe(
        (res) => {
          console.log('done');
        }, (error) => {
          console.log(error);
        }
      );
    }
  }
}