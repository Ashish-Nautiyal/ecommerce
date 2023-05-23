import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router, public dialogRef: MatDialogRef<HomeComponent>) { }

  myProfile(){
    this.dialogRef.close();
    this.router.navigate(['/user/profile']);
  }

  addAddress() {
    this.dialogRef.close();
    this.router.navigate(['/user/addShippingAddress']);
  }

  myOrder() {
    this.dialogRef.close();
    this.router.navigate(['/user/myOrder']);
  }

  myWishList() {
    this.dialogRef.close();
    this.router.navigate(['/user/myWishlist']);
  }
}