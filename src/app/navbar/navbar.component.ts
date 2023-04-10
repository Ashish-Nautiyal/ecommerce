import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  currentUserEmail: any;
  currentUserRole: any;


  ngOnInit(): void {
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.currentUserRole = localStorage.getItem('role');
  }


  logOut() {
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.getCurrentUser();
  }
}