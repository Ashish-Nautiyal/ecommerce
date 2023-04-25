import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

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
  total: any;
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getLocalstorageData();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }


  getLocalstorageData() {
    let product = localStorage.getItem('product') || '';
    let address = localStorage.getItem('address') || '';
    this.productData = JSON.parse(product);
    this.addressData = JSON.parse(address);
    this.total = this.productData.price;
  }


  buy() {
    const obj = { user: this.addressData.user, variant_id: this.productData._id, quantity: this.quantity, price: this.productData.price, total: this.total }
    console.log('obj',obj);
    
    // this.orderService.saveOrder(obj).subscribe(
    //   (res) => {

    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
    // this.router.navigate(['/user/order']);
  }
}