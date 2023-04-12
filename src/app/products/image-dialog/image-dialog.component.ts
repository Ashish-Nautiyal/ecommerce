import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {

  imageIndex: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  changeImage(index: number) {
    this.imageIndex = index;
  }
}