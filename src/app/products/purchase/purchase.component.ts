import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    console.log('0', this.productData);
    console.log('1', this.addressData);
    if (localStorage.getItem('address')) {
      let address = JSON.parse(localStorage.getItem('address') || '');
      this.productService.addShippingAddress(address).subscribe(
        (res) => {

        }, (error) => {

        }
      )
    } else {

    }
  }


  editBtn() {
    this.router.navigate(['/user/checkout'], { queryParams: { action: 'E' } });
  }


  returnTotal() {
    if(localStorage.getItem('cart')){
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      for (let i = 0; i < cart.length; i++) {
        this.total += cart[i].price * cart[i].qty;
      }
    }
  }
}