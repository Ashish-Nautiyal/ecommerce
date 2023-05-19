import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const helper = new JwtHelperService();
    const token = helper.decodeToken(localStorage.getItem('token') || '');
    if (token.role == 0) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}