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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.quickSignUpForm = new FormGroup({
      phone_number: new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    this.authService.quickSignup(this.quickSignUpForm.value).subscribe(
      (res) => {
        let ip;
        const phone = this.quickSignUpForm.get('phone_number').value;
        for (let i = 0; i < environment.data.length; i++) {
          if (environment.data[i].phone_number == phone) {
            ip = environment.data[i].ip;
            console.log('iii',ip);
            
            // this.ipToUserID(ip);
            break;
          }
        }
        this.router.navigate(['/user/checkout']);
      }, (error) => {
        console.log(error);
      }
    );
  }


  ipToUserID(ip: any) {
    this.authService.ipToUserID({ ip: ip }).subscribe(
      (res) => {

      }, (error) => {
        console.log(error);
      }
    )
  }
}