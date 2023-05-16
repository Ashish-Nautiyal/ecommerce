import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-list-variant',
  templateUrl: './list-variant.component.html',
  styleUrls: ['./list-variant.component.scss']
})
export class ListVariantComponent implements OnInit {

  categories: any = [];
  products: any = [];
  variants: any = [];

  form: boolean = false;
  variantForm: any = {
    _id: '',
    name: '',
    product_id: '',
    price: '',
    quantity: '',
    colour: '',
    colour_image: '',
    variant_image: ''
  }
  selectedColourImage: any;
  selectedVariantImage: any;

  constructor(private variantService: VariantService, private categoryService: CategoryService, private productService: ProductService) { }

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

  getProducts(event: any) {
    const _id = event.target.value;
    this.productService.getProductByCatId({ category_id: _id }).subscribe(
      (res) => {
        this.products = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  getVariants(event: any) {
    const _id = event.target.value;
    this.variantService.getVariantByProductId({ product_id: _id }).subscribe(
      (res) => {
        this.variants = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onVariantChange(event: any) {
    const _id = event.target.value;
    console.log();
    this.variantService.getVariantsById({ _id: _id }).subscribe(
      (res) => {
        this.variantForm = res.data;
        this.showForm();
      }, (error) => {
        console.log(error);
      }
    );
  }

  showForm() {
    this.form = true;
  }

  hideForm() {
    this.form = false;
    this.getCategories();
    this.products = [];
    this.variants = [];
  }

  onFileChange(event: any) {
    this.selectedColourImage = event.target.files[0];
  }

  onVariantFileChange(event: any) {
    this.selectedVariantImage = event.target.files;
    console.log('selectedVariantImage', this.selectedVariantImage);
  }

  onSubmit() {
    console.log('variantForm', this.variantForm);
    const formData = new FormData();
    formData.append('_id', this.variantForm._id);
    formData.append('name', this.variantForm.name);
    formData.append('product_id', this.variantForm.product_id);
    formData.append('price', this.variantForm.price);
    formData.append('quantity', this.variantForm.quantity);
    formData.append('colour', this.variantForm.colour);
    if (this.selectedColourImage) {
      formData.append('colour_image', this.selectedColourImage);
    } else {
      formData.append('colour_image', this.variantForm.colour_image);
    }
    if (this.selectedVariantImage) {
      for (let i = 0; i < this.selectedVariantImage.length; i++) {
        formData.append('variant_image', this.selectedVariantImage[i]);
      }
    } else {
      formData.append('variant_image', this.variantForm.variant_image);
    }
    this.variantService.updateVariant(formData).subscribe(
      (res) => {

      }, (error) => {
        console.log(error);
      }
    );
  }
}