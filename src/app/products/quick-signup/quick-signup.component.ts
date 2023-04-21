import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/enviroments/enviroment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quick-signup',
  templateUrl: './quick-signup.component.html',
  styleUrls: ['./quick-signup.component.scss']
})
export class QuickSignupComponent implements OnInit {

  quickSignUpForm: any;
  number = "7983447913";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.quickSignUpForm = new FormGroup({
      phone_number: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.authService.quickSignup(this.quickSignUpForm.value).subscribe(
      (res) => {
        this.ipToUserId();
        this.router.navigate(['/auth/login']);
      }, (error) => {
        console.log(error);
      }
    )
  }

  ipToUserId() {
    for (let i = 0; i < environment.data.length; i++) {
      if (environment.data[i].phone_number == this.number) {
        console.log('yes');
        break;
      } else {
        console.log('no');
      }
    }
  }
}