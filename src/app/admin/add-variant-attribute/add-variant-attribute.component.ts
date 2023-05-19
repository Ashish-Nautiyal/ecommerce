import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VariantService } from '../../services/variant.service';
import { AttributeService } from 'src/app/services/attribute.service';

@Component({
  selector: 'app-add-variant-attribute',
  templateUrl: './add-variant-attribute.component.html',
  styleUrls: ['./add-variant-attribute.component.scss']
})
export class AddVariantAttributeComponent implements OnInit {

  attributeForm: any
  variants: any = [];

  constructor(private variantService: VariantService , private attributeService: AttributeService) { }

  ngOnInit(): void {
    this.getAttributeForm();
    this.getVariants();
  }

  getAttributeForm() {
    this.attributeForm = new FormGroup({
      variant_id: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required)
    });
  }

  getVariants() {
    this.variantService.getVariants().subscribe(
      (res) => {
        this.variants = res.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    console.log(this.attributeForm.value);
    this.attributeService.addAttribute(this.attributeForm.value).subscribe(
      (res) => {
        this.getAttributeForm();
      }, (error) => {
        console.log(error);
      }
    );
  }
}