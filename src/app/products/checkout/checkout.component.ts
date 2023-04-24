import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  purchaseData: any;
  quantity:number= 1;
  
  constructor() { }

  ngOnInit() {
    let data:any = localStorage.getItem('product');
    this.purchaseData = JSON.parse(data);
  }
}