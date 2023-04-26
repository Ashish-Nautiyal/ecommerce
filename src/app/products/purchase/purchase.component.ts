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
  quantity: number = 1;
  total: any;
  constructor(private router: Router, private orderService: OrderService, private productService: ProductService) { }

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
    if (localStorage.getItem('product') && localStorage.getItem('address')) {
      const obj:any = { user: this.addressData.user, variant_id: this.productData._id, quantity: this.quantity, price: this.productData.price, total: this.total }
      console.log('obj', obj);
      console.log('data', this.addressData);

      this.productService.addShippingAddress(this.addressData).subscribe(
        (res) => {
          obj['shippingAddress'] = res.data._id;
          console.log('obj1',obj);          
          this.orderService.saveOrder(obj).subscribe(
            (res) => {
              if (localStorage.getItem('role')) {
                localStorage.removeItem('product');
                localStorage.removeItem('address');
                this.router.navigate(['/user/order']);
              } else {
                localStorage.removeItem('product');
                localStorage.removeItem('address');
                localStorage.removeItem('user');
                this.router.navigate(['/user/order']);
              }
            }, (error) => {
              console.log(error);
            }
          );
        }, (error) => {
          console.log(error);
        }
      );

    } else {
      this.router.navigate(['/user/displayCategory']);
    }
  }


  editBtn() {
    this.router.navigate(['/user/checkout']);
  }
}