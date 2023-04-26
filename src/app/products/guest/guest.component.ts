import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  signIn() {
    this.router.navigate(['/user/quickSignUp']);
  }


  guest() {
    this.router.navigate(['/user/checkout']);
  }
}