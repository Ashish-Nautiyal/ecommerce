import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/app/enviroments/enviroment';
import { VariantService } from 'src/app/services/variant.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { GuestComponent } from '../guest/guest.component';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { filter } from 'rxjs';

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

  constructor(public dialog: MatDialog, private variantService: VariantService, private activateRoute: ActivatedRoute, private wishListService: WishlistService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getQueryParams();
    if (this.product_id != undefined) {
      this.getVariantByProduct();
    }
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }


  getUserId() {
    let user_id;
    if (this.currentUser) {
      user_id = this.currentUser;
    } else {
      user_id = environment.data[2].ip;
    }
    return user_id;
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


  openDialogForGuest(): void {
    this.dialog.open(GuestComponent, {
      width: '400px',
      height: '200px'
    });
  }


  getVariantByProduct() {
    this.variantService.getVariantByProductId({ product_id: this.product_id }).subscribe(
      (res) => {
        this.allVariant = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }


  changeImage(i: any) {
    this.imageIndex = i;
  }


  onSelectColour(i: any) {
    this.variantIndex = i;
  }


  addToCart(val: any) {
    let user_id = this.getUserId();
    val.user = user_id;
    val.qty = 1;
    if (!localStorage.getItem('cart')) {
      let cart = [];
      cart.push(val);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      const found = cart.some((el: any) => el._id == val._id);
      if (!found) {
        cart.push(val);
        localStorage.setItem('cart', JSON.stringify(cart));
      }else{
        var index = 0;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i]._id == val._id) {
            index = i;
            break;
          }
        }
        cart[index].qty = cart[index].qty + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    this.router.navigate(['/user/addToCart']);
  }


  addWishList(val: any) {
    let user_id = this.getUserId();
    this.wishListService.addWishlist({ user: user_id, varinat_id: val._id }).subscribe(
      (res) => {
        this.router.navigate(['/user/wishList']);
      }, (error) => {
        console.log(error);
      }
    );
  }


  buyNow(val: any) {
    let user_id = this.getUserId();
    val.user = user_id;
    val.qty = 1;
    if (!localStorage.getItem('cart')) {
      let cart = [];
      cart.push(val);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart') || '');
      const found = cart.some((el: any) => el._id == val._id);
      if (!found) {
        cart.push(val);
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        var index = 0;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i]._id == val._id) {
            index = i;
            break;
          }
        }
        cart[index].qty = cart[index].qty + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    if (this.currentUser) {
      this.router.navigate(['/user/checkout']);
    } else {
      this.openDialogForGuest();
    }
  }
}