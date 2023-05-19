import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  currentUserRole: any;

  constructor(private router: Router) { }

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
    this.getCurrentUser();
  }

  updateProfile() {
    this.router.navigate(['/user/updateProfile']);
  }
}