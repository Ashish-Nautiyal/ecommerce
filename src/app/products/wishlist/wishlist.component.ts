import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';
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


  getUserId() {
    let user_id;
    if (this.currentUser) {
      user_id = this.currentUser;
    } else {
      user_id = environment.data[2].ip;
    }
    return user_id;
  }


  getWishList() {
    let user_id = this.getUserId();
    this.wishListService.getWishlist({ user: user_id }).subscribe(
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
    let user_id = this.getUserId();
    this.wishListService.removeWishlist({ user: user_id, variant_id: val._id }).subscribe(
      (res) => {
        this.getWishList();
      }, (error) => {
        console.log(error);
      }
    )
  }
}
