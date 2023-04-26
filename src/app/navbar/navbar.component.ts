import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  currentUserEmail: any;
  currentUserRole: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.currentUserRole = localStorage.getItem('role');
  }


  logOut() {
    localStorage.clear();
    this.getCurrentUser();
  }


  updateProfile() {
    this.router.navigate(['/user/updateProfile']);
  }
}