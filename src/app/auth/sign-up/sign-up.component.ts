import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: any;
  message!: string;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSignUpForm();
  };

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: this.message
    });
  }

  getSignUpForm() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      phone_number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    });
  }

  onSubmit() {
    this.authService.signUp(this.signUpForm.value).subscribe(
      (res) => {
        this.message = res.message;
        this.openSnackBar();
        this.router.navigate(['/auth/login']);
      }, (err) => {
        console.log(err.error.message);
        this.message = err.error.message;
        this.openSnackBar();
      }
    );
  };
}