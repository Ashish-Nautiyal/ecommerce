import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ShippingAddressService } from 'src/app/services/shipping-address.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private orderService: OrderService, private router: Router, private addressService: ShippingAddressService) { }

  ngOnInit(): void {
    this.orderSave();
  }

  orderSave() {
    if (localStorage.getItem('address')) {
      let address = JSON.parse(localStorage.getItem('address') || '');
      this.addressService.addShippingAddress(address).subscribe(
        (res) => {
          console.log('0', res);
          let product = JSON.parse(localStorage.getItem('cart') || '');
          this.orderService.saveOrder({ product: product, user: address.user, shippingAddress: res.data._id }).subscribe(
            (res) => {
              localStorage.removeItem('cart');
              localStorage.removeItem('address');
            }, (error) => {
              console.log(error);
            }
          )
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      this.router.navigate(['/user/displayCategory']);
    }
  }
}