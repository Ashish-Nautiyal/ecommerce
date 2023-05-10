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

  paymentHandler: any = null;
  currentUser: any;
  productData: any;
  addressData: any;
  total: number = 0;
  constructor(private router: Router, private productService: ProductService, private orderService: OrderService) { }

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
    this.productService.makePayment({amount:2000}).subscribe(
      (res) => {
        console.log('res',res);  
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


  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51N2pSMSEsz94il2uKSb0bh1sNX6EvL2otUrfDdXaqWocdbrLComG22aqGjXeDCpeH1ob0Wq0AXLCGOHnLFdTdEkF00EICybkLp',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe(stripeToken);
      },
    });

    const paymentStripe = (stripeToken:any) => {
      this.productService.makePayment(stripeToken).subscribe(
        (res) => {
          console.log(res);          
        }, (error) => {
          console.log(error);          
        }
      )
    }

    paymentHandler.open({
      name: 'Ashish',
      description: 'stripe payment',
      amount: amount * 100
    })
  }
}