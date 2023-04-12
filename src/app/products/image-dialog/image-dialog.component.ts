import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  imageIndex:number = 0;

  constructor(public dialogRef: MatDialogRef<ImageDialogComponent> ,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('data',this.data);    
  }

  changeImage(index:number){
    this.imageIndex = index;
  }
}