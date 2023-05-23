import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  currentUser: any;
  myOrder: any;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getMyOrder();
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    const token: any = this.authService.getAuthToken();
    const decoded = helper.decodeToken(token);
    if (decoded) {
      this.currentUser = decoded.user;
    }
  }

  getMyOrder() {
    if (this.currentUser) {
      this.orderService.getOrder({ user: this.currentUser }).subscribe(
        res => {
          this.myOrder = res.data;
        }, error => console.log(error)
      );
    }
  }
}