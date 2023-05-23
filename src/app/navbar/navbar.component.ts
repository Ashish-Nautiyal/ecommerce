import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HomeComponent } from '../user/home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  currentUserRole: any;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    const token = helper.decodeToken(localStorage.getItem('token') || '');
    if (token) {
      this.currentUserRole = token.role;
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  updateProfile() {
    this.router.navigate(['/user/updateProfile']);
  }

  openDialog(): void {
    this.dialog.open(HomeComponent, {
      width: '250px',
      height: '300px',
      position: { right: '20px', top: '50px' }
    });
  }
}