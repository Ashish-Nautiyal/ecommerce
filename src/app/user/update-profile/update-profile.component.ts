import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})

export class UpdateProfileComponent implements OnInit {

  user: any;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.user = params['user'];
      if (!this.user) {
        this.router.navigate(['/user/profile']);
      }
      this.user = JSON.parse(this.user);
      console.log('user', this.user);
    });
  }

  onSubmit() {
    this.userService.updateProfile(this.user).subscribe(
      (res) => {
       this.cancel();      
      }, (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/user/profile']);
  }
}