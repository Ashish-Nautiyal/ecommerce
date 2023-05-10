import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categories: any = [];
  showForm: boolean = false;
  categoryForm: any = {
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
        this.categoryForm.name = res.data.name;
        this.categoryForm.category_image = res.data.category_image;
      }, (error) => {
        console.log(error);
      }
    );
    this.showForm = true;
  }


  hideForm() {
    this.showForm = false;
  }


  onFileChange(event: any) {
    this.selectedImage = event.target.files[0];
    console.log('event', this.selectedImage);
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('name',this.categoryForm.name);
    formData.append('category_image',this.categoryForm.category_image);

    
  }
}