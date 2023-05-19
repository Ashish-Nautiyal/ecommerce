import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: any;
  selectedCategoryImage: any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategoryForm();
  }

  getCategoryForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category_image: new FormControl('', Validators.required)
    });
  }

  onImageSelect(event: any) {
    this.selectedCategoryImage = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.categoryForm.get('name').value);
    formData.append('category_image', this.selectedCategoryImage);
    this.categoryService.addCategory(formData).subscribe(
      (res) => {
      this.getCategoryForm();
      }, (error) => {
        console.log(error);
      }
    )
  }
}