import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  currentUser: any;
  purchaseData: any;
  quantity: number = 1;
  total: any;

  constructor(private activateRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(
      (params) => { this.purchaseData = JSON.parse(params['data']); }
    );
    this.total = this.purchaseData.price * this.quantity;
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('email');
  }

  quantityEdit(val: any) {
    if (val === -1) {
      this.quantity = this.quantity - 1;
    } else {
      this.quantity = this.quantity + 1;
    }
    this.total = this.purchaseData.price * this.quantity;
  }

  buy() {
    let orderData = {
      user: this.currentUser,
      variant_id: this.purchaseData._id,
      price: this.purchaseData.price,
      quantity: this.quantity,
      total: this.total
    }
    this.orderService.saveOrder(orderData).subscribe(
      (res) => {
      }, (error) => {
        console.log(error);
      }
    )
  }
}