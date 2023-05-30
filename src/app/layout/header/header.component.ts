import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from 'src/app/user/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  role: any;
  loggedIn: boolean = false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.isLoggedIn();
  }

  getCurrentUser() {
    if(this.loggedIn){
      const helper = new JwtHelperService();
      const token = helper.decodeToken(localStorage.getItem('token') || '');
      if (token) {
        this.role = token.role;
        console.log('tokenrole', token.role);
      }
    }else{
      console.log('no login');      
    }   
  }

  isLoggedIn() {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
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
