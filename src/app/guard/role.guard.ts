import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  currentUserRole: any

  constructor(private router: Router) { }

  canActivate(): boolean {
    this.currentUserRole = localStorage.getItem('role');
    if (this.currentUserRole == 0) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}