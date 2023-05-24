import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})

export class UpdateProfileComponent implements OnInit {

  user: any;
  updateForm: any;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['user']) {
        let id = params['user'];
        this.userService.getProfile({ _id: id }).subscribe(
          res => {
            this.user = res.data;
          }, error => console.log(error.message)
        );
      } else {
        this.cancel();
      }
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