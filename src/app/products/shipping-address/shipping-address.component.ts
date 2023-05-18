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

  // @Output() childEvent = new EventEmitter();
  addressForm: any;
  currentUser: any;
  userId: any;

  constructor(public dialog: MatDialog, private router: Router, private addressService: ShippingAddressService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getUserId();
    this.Form();
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

  Form() {
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
          // let form = false;
          // this.childEvent.emit(form);
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      localStorage.setItem('address', JSON.stringify(this.addressForm.value));
      // let form = false;
      // this.childEvent.emit(form);
      // this.Form();
    }
  }

  cancel() {
    // let form = false;
    // this.childEvent.emit(form);
  }

  next(){
    
  }
}