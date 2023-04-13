import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-display-variant',
  templateUrl: './display-variant.component.html',
  styleUrls: ['./display-variant.component.scss']
})
export class DisplayVariantComponent implements OnInit {

  product_id: any;
  variants: any = [];

  constructor(private activateRoute: ActivatedRoute, private variantService: VariantService, private router: Router) { }


  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => this.product_id = params['product_id']);
    if (this.product_id != undefined) {
      this.getVariantByProduct();
    }
  }


  getVariantByProduct() {
    this.variantService.getVariantByProductId({ product_id: this.product_id }).subscribe(
      (res) => {
        this.variants = res.data;
      }, (error) => {
        console.log(error);
      }
    )
  }


  onSelectedVariant(event: any) {
    this.router.navigate(['/user/productDetail'], { queryParams: { variant_id: event._id, product_id: this.product_id } });
  }


}