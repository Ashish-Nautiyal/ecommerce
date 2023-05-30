import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HomeComponent } from 'src/app/user/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  role: any;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    const token = helper.decodeToken(localStorage.getItem('token') || '');
    if (token) {
      this.role = token.role;
    } else {
      this.role = -1;
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