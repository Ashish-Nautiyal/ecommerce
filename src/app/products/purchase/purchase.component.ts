import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  currentUser: any;
  productData: any;
  addressData: any;
  total: number = 0;
  constructor(private router: Router, private productService: ProductService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.returnTotal();
    this.productData = JSON.parse(localStorage.getItem('cart') || '');
    this.addressData = JSON.parse(localStorage.getItem('address') || '');
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }


  buy() {
    console.log('done');    
    // if (localStorage.getItem('address')) {
    //   let address = JSON.parse(localStorage.getItem('address') || '');
    //   this.productService.addShippingAddress(address).subscribe(
    //     (res) => {
    //       console.log('0', res);
    //       let product = JSON.parse(localStorage.getItem('cart') || '');
    //       this.orderService.saveOrder({ product: product, user: address.user, shippingAddress: res.data._id, total: this.total }).subscribe(
    //         (res) => {
    //           console.log('1', res);
    //         }, (error) => {
    //           console.log(error);
    //         }
    //       )
    //     }, (error) => {
    //       console.log(error);
    //     }
    //   );
    // } else {
    //   this.router.navigate(['/user/displayCategory']);
    // }
  }


  editBtn() {
    this.router.navigate(['/user/checkout'], { queryParams: { action: 'E' } });
  }


  returnTotal() {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      for (let i = 0; i < cart.length; i++) {
        this.total += cart[i].price * cart[i].qty;
      }
    }
  }
}