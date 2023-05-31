import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from 'src/app/user/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn();
    this.userType();
  }

  isLoggedIn() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  userType() {
    this.authService.userType$.subscribe((userType: number) => {
      if (userType === 0) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  openDialog(): void {
    this.dialog.open(HomeComponent, {
      width: '250px',
      height: '300px',
      position: { right: '20px', top: '50px' },
    });
  }
}