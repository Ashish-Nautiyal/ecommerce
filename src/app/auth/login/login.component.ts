import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  message!: string;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getLoginForm();
  };

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: this.message
    });
  }

  getLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        this.message = res.message;
        this.openSnackBar();
        localStorage.clear();
        localStorage.setItem('token', res.data.token);        
        const helper = new JwtHelperService();
        const token = helper.decodeToken(res.data.token);
        this.authService.loginCheck(token.role);
        if (token.role == 0) {
          this.router.navigate(['/admin/admin-dashboard']);
        } else {
          this.router.navigate(['/user/displayCategory']);
        }
      }, (err) => {
        console.log(err.error.message);
        this.message = err.error.message;
        this.openSnackBar();
      }
    );
  };
}