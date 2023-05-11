import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categories: any = [];
  form: boolean = false;
  categoryForm: any = {
    _id: '',
    name: '',
    category_image: ''
  }
  selectedImage: any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this.categoryService.getCategory().subscribe(
      (res) => {
        this.categories = res.data; 
      }, (error) => {
        console.log(error);
      }
    );
  }


  onChange(event: any) {
    let categoryId = event.target.value;
    this.categoryService.CategoryById({ categoryId: categoryId }).subscribe(
      (res) => {
        this.categoryForm._id = res.data._id;
        this.categoryForm.name = res.data.name;
        this.categoryForm.category_image = res.data.category_image;
      }, (error) => {
        console.log(error);
      }
    );
    this.showForm();
  }


  showForm() {
    this.form = true;
  }


  hideForm() {
    this.form = false;
    this.selectedImage = undefined;
    this.getCategories();
  }


  onFileChange(event: any) {
      this.selectedImage = event.target.files[0];
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('_id', this.categoryForm._id);
    formData.append('name', this.categoryForm.name);
    if (this.selectedImage) {
      formData.append('category_image', this.selectedImage);
    } else {
      formData.append('category_image', this.categoryForm.category_image);
    }
    this.categoryService.updateCategory(formData).subscribe(
      (res) => {
        this.hideForm();
      }, (error) => {
        console.log(error);
      }
    );
  }
}