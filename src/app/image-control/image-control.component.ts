import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CropperDialogResult, ImageCropComponent } from '../image-crop/image-crop.component';
import { filter } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.scss'],
})
export class ImageControlComponent implements OnInit{
  imageWidth = signal(0); 
  @Input() set width(val:number){
    this.imageWidth.set(val);
  }

  imageHeight = signal(0);
  @Input() set height(val: number) {
    this.imageHeight.set(val);
  }

  placeholder = computed(() => `https://placehold.co/${this.imageWidth()}x${this.imageHeight()}`);
  croppedImage = signal<CropperDialogResult | undefined>(undefined);

  imageSource = computed(() => {
    if(this.croppedImage()) {
      return this.croppedImage()?.imageUrl;
    }
    return this.placeholder();
  });

  ngOnInit(): void {
    this.imageWidth.set(this.shared.width);
    this.imageHeight.set(this.shared.height);
  }
  dialog = inject(MatDialog);

  constructor(private shared: SharedService) {}

  fileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const dialogRef = this.dialog.open(ImageCropComponent, {
        data: { image: file, width: this.shared.width, height: this.shared.height },
        width: '500px'
      });
  
      dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
        console.log('Width:', this.imageWidth());
        console.log('Height:', this.imageHeight());
        this.croppedImage.set(result);
      });
    }
  }
  }
