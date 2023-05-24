import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromocodeService } from 'src/app/services/promocode.service';

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.scss']
})
export class PromocodeComponent implements OnInit {

  promocodeForm: any;

  constructor(private promocodeService: PromocodeService, private router: Router) { }

  ngOnInit(): void {
    this.getPromocodeForm();
  }

  // generatePromoCode() {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //   this.promocode = Array(8).fill(null).map((_, i) => characters[Math.floor(Math.random() * characters.length)]).join('');
  //   console.log('promocode', this.promocode);
  // }
  // onSelectUsers(event: any) {
  //   let checked = event.target.checked;
  //   let value = event.target.value;
  //   if (checked) {
  //     this.selectedUsers.push(value);
  //   } else {
  //     if (this.selectedUsers.includes(value)) {
  //       const index = this.selectedUsers.indexOf(value);
  //       this.selectedUsers.splice(index, 1);
  //     }
  //   }
  // }
  getPromocodeForm() {
    this.promocodeForm = new FormGroup({
      title: new FormControl('', Validators.required),
      promoCode: new FormControl('', Validators.required),
      discount: new FormControl('',[Validators.required, Validators.pattern('^[0-9]*$')]),
      expiry_date: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    // console.log('pppppp',this.promocodeForm.value);
    // this.promocodeService.savePromocode(this.promocodeForm.value).subscribe(
    //   res => {
    this.router.navigate(['/admin/admin-dashboard/givePromocode']);
    //   }, error => console.log(error)
    // );
  }
  status = false;

  key(event: any) {
    let keyCode = event.keyCode;
    if (((keyCode >= 48 && keyCode <= 57) ||
    (keyCode >= 96 && keyCode <= 105))) {
      alert("Acha Bacha")
      // this.status = true;
    } else {
      alert("Kya kr raha hai")
      console.log('aaaaaaaaaa');
      return
    }
  }
}