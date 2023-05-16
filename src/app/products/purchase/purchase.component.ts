import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  paymentHandler: any = null;
  currentUser: any;
  productData: any;
  addressData: any;
  total: number = 0;
  
  constructor(private router: Router, private productService: ProductService) { }

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
    this.productService.makePayment({ amount: this.total }).subscribe(
      (res) => {
        console.log('res', res);
        window.location.href = res.url;
      }, (error) => {
        console.log(error);
      }
    )
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