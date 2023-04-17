import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { VariantService } from 'src/app/services/variant.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {

  currentUser: any;
  product_id: any;
  allVariant: any = [];
  imageIndex: number = 0;
  variantIndex: number = 0;

  constructor(public dialog: MatDialog, private variantService: VariantService, private activateRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getQueryParams();
    if (this.product_id != undefined) {
      this.getVariantByProduct();
    }
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('email');
  }

  getQueryParams() {
    this.activateRoute.queryParams.subscribe(params => {
      this.product_id = params['product_id'];
    });
  }


  openDialog(variantIndex: any): void {
    this.dialog.open(ImageDialogComponent, {
      width: '1600px',
      height: '700px',
      data: { data: this.allVariant, variantIndex: variantIndex }
    });
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


  onSelectColour(i: any) {
    this.variantIndex = i;
  }


  addToCart(val: any) {
    this.cartService.addToCart({ user: this.currentUser, variant_id: val._id, price: val.price }).subscribe(
      (res) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      }
    )
  }
} 