import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {

  Products: any = [];
  form: boolean = false;
  productForm: any = {
    _id: '',
    name: '',
    category_id: '',
    subCategory_id: '',
    description: '',
    product_image: '',
  }
  selectedImage: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.Products = res.data;
        console.log('products', this.Products);
      }, (error) => {
        console.log(error);
      }
    );
  }


  onChange(event: any) {
    let productId = event.target.value;
    console.log('id', productId);
    this.productService.getProductByProductId({ _id: productId }).subscribe(
      (res) => {
        this.productForm = res.data;
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
    this.getProducts();
  }


  onFileChange(event: any) {
    this.selectedImage = event.target.files[0];
    console.log('selectedImage', this.selectedImage);
  }


  onSubmit() {
    // const formData = new FormData();
    // formData.append('_id', this.productForm._id);
    // formData.append('name', this.productForm.name);
    // if (this.selectedImage) {
    //   formData.append('category_image', this.selectedImage);
    // } else {
    //   formData.append('category_image', this.productForm.category_image);
    // }
    // this.categoryService.updateCategory(formData).subscribe(
    //   (res) => {
    //     this.hideForm();
    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
    
    console.log('submit', this.productForm);
  }
}