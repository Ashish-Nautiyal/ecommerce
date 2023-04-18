import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  currentUser: any;
  wishList: any = [];
  constructor(private wishListService: WishlistService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getWishList();
  }


  getCurrentUser() {
    this.currentUser = localStorage.getItem('email');
  }


  getWishList() {
    this.wishListService.getWishlist({ user: this.currentUser }).subscribe(
      (res) => {
        if (res.data) {
          this.wishList = res.data;
        }
      }, (error) => {
        console.log(error);
      }
    )
  }


  removeWishlist(val: any) {
    this.wishListService.removeWishlist({ user: this.currentUser, variant_id: val._id }).subscribe(
      (res) => {
        this.getWishList();
      }, (error) => {
        console.log(error);
      }
    )
  }
}
