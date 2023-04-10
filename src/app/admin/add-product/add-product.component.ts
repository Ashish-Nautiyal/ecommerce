import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {

  productForm: any;
  categories: any;
  subCategories: any = [];
  subCategories1: any = [];



  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
    this.Form();
  };

  Form() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      subCategory_id: new FormControl(null),
      description: new FormControl('', Validators.required),
    });
  }


  onSubmit() {
    this.productService.addProduct(this.productForm.value).subscribe(
      (res) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      }
    );
  };



  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  };



  getSubcategories(event: any) {
    const id = event.target.value;
    this.categoryService.getCategoryById({ parent_id: id }).subscribe(
      (res) => {
        if (this.subCategories1.length > 0) {
          this.subCategories1 = [];
        }
        this.subCategories = res.data;
      }, (error) => {
        console.log(error);
      }
    )
  }

  onChange(event: any, i: number) {
    const id = event.target.value;
    if (i == -1) {
      this.subCategories1 = [];
    }
    this.subCategories1.splice(i + 1);
    this.categoryService.getCategoryById({ parent_id: id }).subscribe(
      (res) => {
        if (res.data.length > 0) {
          this.subCategories1.push(res.data);
        }
      }, (error) => {
        console.log(error);
      }
    )
  }
}