import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { VariantService } from 'src/app/services/variant.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {

  imageIndex: number = 0;
  variant_id: any;
  product_id: any
  variant: any = [];
  allVariant: any = [];

  constructor(public dialog: MatDialog, private variantService: VariantService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.variant_id = params['variant_id'];
      this.product_id = params['product_id']
    });
    if (this.variant_id != undefined) {
      this.getVariant();
      this.getVariantByProduct();
    }
  }


  openDialog(): void {
    this.dialog.open(ImageDialogComponent, {
      width: '1600px',
      height: '700px',
      data: this.variant
    });
  }


  getVariant() {
    this.variantService.getVariantsById({ variant_id: this.variant_id }).subscribe(
      (res) => {
        this.variant = res.data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  getVariantByProduct() {
    this.variantService.getVariantByProductId({ product_id: this.product_id }).subscribe(
      (res) => {
        this.allVariant = res.data;
      }, (error) => {
        console.log(error);
      }
    )
  }


  changeImage(i: any) {
    this.imageIndex = i;
  }
}