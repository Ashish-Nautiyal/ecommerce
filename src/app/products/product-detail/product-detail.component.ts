import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  variant_id: any;
  product_id: any;
  variant: any = [];
  variant_colours: any = [];

  constructor(private route: ActivatedRoute, private variantService: VariantService) { }

  ngOnInit(): void {
    this.querParam();
    this.getVariantById();
    this.getVariantColour();
  }


  querParam() {
    this.route.queryParams
      .subscribe(params => {
        this.variant_id = params['variant_id'];
        this.product_id = params['product_id'];
      }
      );
  }


  getVariantById() {
    this.variantService.getVariantById({ id: this.variant_id }).subscribe(
      (res) => {
        this.variant = res.data;
        console.log('variant', this.variant);

      }, (error) => {
        console.log(error);

      }
    )
  }


  getVariantColour() {
    this.variantService.getVariantColour({ id: this.product_id }).subscribe(
      (res) => {
        this.variant_colours = res.data;
        console.log('color',this.variant_colours);        
      }, (error) => {
        console.log(error);

      }
    )
  }
}