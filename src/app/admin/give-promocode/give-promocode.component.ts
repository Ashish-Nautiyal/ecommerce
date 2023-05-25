import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocodeService } from 'src/app/services/promocode.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-give-promocode',
  templateUrl: './give-promocode.component.html',
  styleUrls: ['./give-promocode.component.scss']
})
export class GivePromocodeComponent implements OnInit {

  promoCodes: any = [];
  users: any = [];
  showList: boolean = false;
  assignPromocodeForm: any = {
    promocode: '',
    user: ''
  }

  constructor(private promocodeService: PromocodeService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getPromocodes();
    this.getAllUsers();
  }

  getPromocodes() {
    this.promocodeService.getPromocodes().subscribe(
      res => {
        this.promoCodes = res.data;
        let date = new Date();
        for (let i = 0; i < this.promoCodes.length; i++) {
          let date1 = new Date(this.promoCodes[i].expiry_date);
          if (date > date1) {
            this.promoCodes[i].status = 'Expired';
          } else {
            this.promoCodes[i].status = 'Active';
          }
        }
      }, error => console.log(error)
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res.data;
      }, error => console.log(error)
    );
  }

  assignPromocodes() {
    this.showList = true;
  }

  submit() {
    this.promocodeService.assignPromocode(this.assignPromocodeForm).subscribe(
      res => {
        this.showList = false;
        this.assignPromocodeForm.promocode = '';
        this.assignPromocodeForm.user = '';
      }, error => console.log(error)
    );
  }

  cancel() {
    this.showList = false;
    this.assignPromocodeForm.promocode = '';
    this.assignPromocodeForm.user = '';
  }

  deletePromocode() {

  }
}