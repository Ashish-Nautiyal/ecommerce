import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quick-signup',
  templateUrl: './quick-signup.component.html',
  styleUrls: ['./quick-signup.component.scss']
})
export class QuickSignupComponent implements OnInit {

  quickSignUpForm: any;
  
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.quickSignUpForm = new FormGroup({
      phone_number: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.authService.quickSignup(this.quickSignUpForm.value).subscribe(
      (res) => {
        this.router.navigate(['/auth/login']);
      }, (error) => {
        console.log(error);
      }
    )
  }
}