import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-add-variant',
  templateUrl: './add-variant.component.html',
  styleUrls: ['./add-variant.component.scss']
})

export class AddVariantComponent implements OnInit {

  variantForm: any;
  products: any = [];
  selectedColourFile: any;
  selectedProductFile: any;

  constructor(private productService: ProductService, private variantService: VariantService) { }

  ngOnInit(): void {
    this.getVariantForm();
    this.getProducts();
  }

  getVariantForm() {
    this.variantForm = new FormGroup({
      product_id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', Validators.required),
      colour: new FormControl('', Validators.required),
      color_image: new FormControl('', Validators.required),
      variant_image: new FormControl('', Validators.required)
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onSelectColourFile(event: any) {
    this.selectedColourFile = event.target.files[0];
  }

  onSelectProductFile(event: any) {
    this.selectedProductFile = event.target.files;
  };

  onSubmit() {
    const formData = new FormData();
    formData.append('product_id', this.variantForm.get('product_id').value);
    formData.append('name', this.variantForm.get('name').value);
    formData.append('price', this.variantForm.get('price').value);
    formData.append('quantity', this.variantForm.get('quantity').value);
    formData.append('colour', this.variantForm.get('colour').value);
    formData.append('colour_image', this.selectedColourFile);
    for (let i = 0; i < this.selectedProductFile.length; i++) {
      formData.append('variant_image', this.selectedProductFile[i]);
    }
    
    this.variantService.addVariant(formData).subscribe(
      (res) => {
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      }
    );
  }
}