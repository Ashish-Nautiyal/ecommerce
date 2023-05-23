import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.scss']
})
export class DisplayProductComponent implements OnInit {

  products: any = [];
  category_id: any;

  constructor(private router: Router, private productService: ProductService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
  };

  getParams() {
    this.activateRoute.queryParams.subscribe(params => {
      if (params['category_id']) {
        this.category_id = params['category_id'];
        this.getProductsByCategory();
      } 
    });
  }

  getProductsByCategory() {
    this.productService.getProductByCatId({ category_id: this.category_id }).subscribe(
      (res) => {
        this.products = res.data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  onSelectedProduct(event: any) {
    this.router.navigate(['/user/productDetail'], { queryParams: { product_id: event._id } });
  }
}