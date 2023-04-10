import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      parent_id: new FormControl(null)
    });
  }


  onSubmit() {   
    this.categoryService.addCategory(this.categoryForm.value).subscribe(
      (res) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      }
    )
  }

}