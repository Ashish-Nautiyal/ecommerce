import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/app/enviroments/enviroment';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})

export class ShippingAddressComponent implements OnInit {

  addressForm: any;
  currentUser: any;
  userId: any;

  constructor(public dialog: MatDialog, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.getCurrentUser();
    if (this.currentUser) {
      this.userId = this.currentUser;
    } else {
      this.userId = environment.data[2].ip;
    }
    this.Form();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
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
    });
  }


  onSubmit() {
    localStorage.setItem("address", JSON.stringify(this.addressForm.value));
    this.router.navigate(['/user/purchase']);
  }
}