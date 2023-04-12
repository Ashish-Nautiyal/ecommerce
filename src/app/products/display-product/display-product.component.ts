import { Component, OnInit } from '@angular/core';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.scss']
})
export class DisplayProductComponent implements OnInit {

  productVariants: any;
  
  constructor(private variantService: VariantService) { }

  ngOnInit(): void {
    this.getVariants();
  };


  getVariants() {
    this.variantService.getVariants().subscribe(
      (res) => {
        this.productVariants = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  } 
}