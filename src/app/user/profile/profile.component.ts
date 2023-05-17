import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  user: any;
  isChildComponentRendered: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getProfile();
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }

  getProfile() {
    this.userService.getProfile({ _id: this.currentUser }).subscribe(
      (res) => {
        this.user = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  editProfile() {
    let userData: any = JSON.stringify(this.user);
    this.router.navigate(['/user/updateProfile'], { queryParams: { user: userData } });
  }

  showAddressForm() {
    this.isChildComponentRendered = true;
  }

  closeAddressForm(event: any) {
    if (this.currentUser) {
      this.isChildComponentRendered = event;
      this.getCurrentUser();
      this.getProfile();
    } else {
      this.isChildComponentRendered = event;
    }
  }
}