import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})

export class AddSubcategoryComponent implements OnInit {

  subCategoryForm: any;
  categories: any;
  subCategories: any = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getSubCategoryForm();
    this.getCategories();
  }

  getSubCategoryForm() {
    this.subCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      parent_id: new FormControl('', Validators.required)
    });
  }

  getCategories() {
    this.categoryService.getCategoryTree().subscribe(
      (res) => {
        this.categories = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  };

  onChange(event: any, i: number) {
    const id = event.target.value;
    if (i == -1) {
      this.subCategories = [];
    }
    this.subCategories.splice(i + 1);
    this.categoryService.getCategoryById({ parent_id: id }).subscribe(
      (res) => {
        if (res.data.length > 0) {
          this.subCategories.push(res.data);
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.categoryService.addCategory(this.subCategoryForm.value).subscribe(
      (res) => {
        this.subCategories = [];
        this.getSubCategoryForm();
      }, (error) => {
        console.log(error);
      }
    );
  }
}