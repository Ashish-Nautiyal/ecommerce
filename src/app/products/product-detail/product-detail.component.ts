import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VariantService } from 'src/app/services/variant.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

export interface DialogData {
  _id: string
  name: string
  product_id: string
  price: number
  quantity: number
  colour: string
  colour_image: string
  product_image: string[]
  __v: number
}

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
  variant_size: any = [];
  imageIndex: any = 0;


  constructor(private route: ActivatedRoute, private variantService: VariantService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.querParam();
    this.getVariantById();
    this.getVariantColour();
    this.getVariantSize();
  }


  openDialog(): void {
    this.dialog.open(ImageDialogComponent, {
      width: '1600px',
      height: '700px',
      data: this.variant
    });

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
      }, (error) => {
        console.log(error);
      }
    )
  }


  getVariantColour() {
    this.variantService.getVariantColour({ id: this.product_id }).subscribe(
      (res) => {
        this.variant_colours = res.data;
      }, (error) => {
        console.log(error);
      }
    )  
  }


  getVariantSize() {
    this.variantService.getVariantColour({ id: this.variant_id }).subscribe(
      (res) => {
        this.variant_size = res.data;
        console.log('size', this.variant_size);
      }, (error) => {
        console.log(error);
      }
    )
  }


  changeImage(i: any) {
    this.imageIndex = i;
  }
}