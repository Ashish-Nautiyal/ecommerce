import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { ShippingAddressService } from 'src/app/services/shipping-address.service';

@Component({
  selector: 'app-add-shipping-address',
  templateUrl: './add-shipping-address.component.html',
  styleUrls: ['./add-shipping-address.component.scss']
})
export class AddShippingAddressComponent implements OnInit {

  currentUser: any;
  addressForm: any;

  constructor(private router: Router, private addressService: ShippingAddressService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAddressForm();
  }

  getAddressForm() {
    this.addressForm = new FormGroup({
      user: new FormControl(this.currentUser, Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      type: new FormControl('', Validators.required),
    });
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    const token: any = this.authService.getAuthToken();
    const decoded = helper.decodeToken(token);
    if (decoded) {
      this.currentUser = decoded.user;
    }
  }

  onSubmit() {
    if (this.currentUser) {
      this.addressService.addShippingAddress(this.addressForm.value).subscribe(
        (res) => {
          this.router.navigate(['/user/profile']);
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/user/profile']);
  }
}