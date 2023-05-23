import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  user: any;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getProfile();
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    const token: any = this.authService.getAuthToken();
    const decoded = helper.decodeToken(token);
    if (decoded) {
      this.currentUser = decoded.user;
    }
  }

  getProfile() {
    this.userService.getProfile({ _id: this.currentUser }).subscribe(
      (res) => {
        this.user = res.data;
      }, (error) => {
        console.log(error.error.message);
      }
    );
  }

  editProfile() {
    this.router.navigate(['/user/updateProfile'], { queryParams: { user: this.user._id } });
  }
}