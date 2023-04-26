import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  purchaseData: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.purchaseData = JSON.parse(localStorage.getItem('cart') || '');
    if (!this.purchaseData) {
      this.router.navigate(['/user/displayCategory']);
    }
  }
}