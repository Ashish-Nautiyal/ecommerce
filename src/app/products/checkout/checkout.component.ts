import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  purchaseData: any;
  quantity:number= 1;
  
  constructor(private router: Router) { }

  ngOnInit() {
    let data:any = localStorage.getItem('product');
    this.purchaseData = JSON.parse(data);
    if(!data){
      this.router.navigate(['/user/displayCategory']);
    }
  }
}