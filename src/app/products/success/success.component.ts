import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private productService: ProductService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderSave();
  }


  orderSave() {
    if (localStorage.getItem('address')) {
      let address = JSON.parse(localStorage.getItem('address') || '');
      this.productService.addShippingAddress(address).subscribe(
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