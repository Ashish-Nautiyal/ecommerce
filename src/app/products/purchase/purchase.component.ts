import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/enviroments/enviroment';
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
  quantity: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getLocalstorageData();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('email');
  }


  getLocalstorageData() {
    let product = localStorage.getItem('product') || '';
    let address = localStorage.getItem('address') || '';
    this.productData = JSON.parse(product);
    this.addressData = JSON.parse(address);
  }


  buy() {
    this.router.navigate(['/user/order']);
  }
}