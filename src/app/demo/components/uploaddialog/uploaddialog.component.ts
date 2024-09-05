import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from './image-cropper/image-cropper.component';
import { FileSelectEvent } from 'primeng/fileupload';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { ImageCropperComponent } from 'ngx-image-cropper';

interface ImageTransform {
  scale?: number;
  rotate?: number;
  flipH?: boolean;
  flipV?: boolean;
  translateH?: number;
  translateV?: number;
  translateUnit?: '%' | 'px';
  zoom?: number;
}

@Component({
  selector: 'app-uploaddialog',
  templateUrl: './uploaddialog.component.html',
  styleUrls: ['./uploaddialog.component.scss']
})
export class UploadDialogComponent {

  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder) { }
 
  @Output() upload = new EventEmitter<any>();
  @Input() ratio = 3 / 4
  @Input() uploadUrl =''

  imageChangedEvent: any = '';
  croppedImage: any = '';
  name: any = '';
  uploadedFiles: any[] = [];
  form = this.fb.group({
    id: 0,
    name: null,
    user_id: null,
    color: null,
    image: null,

  })
  @ViewChild(ImageCropperComponent) imageCropperEl: ImageCropperComponent
  public imageFile: any;
  scale = 1;
  loading: boolean = false;
  canvasRotation = 0;
  translateH = 0;
  translateV = 0;
  transform: ImageTransform = {
    scale: 1,
    rotate: 0,
    flipH: false,
    flipV: false,
    translateUnit: 'px'
  };
  lastEvent = null


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageLoaded(event: any) {

  }
  loadImageFailed() {
    console.log('Load failed');
  }
  cropperReady() {
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onSelect(e: FileSelectEvent) {
    this.imageFile = e.files[0];
  }

  imageCropped(event: any) {
    const imageUrl = event.objectUrl || event.base64 || '';
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    if (imageUrl.startsWith('data:')) {
      this.applyTransform();
    }
    this.lastEvent = event
  }

  rotateLeft() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  rotateRight() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  zoom(event: any) {
    this.loading = true;
    setTimeout(() => {
      this.transform = {
        ...this.transform,
        scale: this.scale
      };
    });

  }

  emit() {
    this.imageCropperEl.crop()
    this.upload.emit(this.lastEvent)
  }



  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
    this.translateH = 0;
    this.translateV = 0;
  }

  private applyTransform() {
    const cropperImageElement = document.querySelector('.cropper-wrapper img') as HTMLElement;
    const croppedImageElement = document.querySelector('.popup-image') as HTMLElement;
    const { scale, rotate, flipH, flipV } = this.transform;

    let transformString = `scale(${scale || 1}) rotate(${rotate || 0}deg)`;

    if (flipH) {
      transformString += ' scaleX(-1)';
    }
    if (flipV) {
      transformString += ' scaleY(-1)';
    }
    if (cropperImageElement) {
      cropperImageElement.style.transform = transformString;
    }
    if (croppedImageElement) {
      croppedImageElement.style.transform = transformString;
    }
  }



}
