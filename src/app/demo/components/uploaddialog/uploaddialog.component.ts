import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { FixMeLater, QRCodeElementType, QRCodeErrorCorrectionLevel } from 'angularx-qrcode';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';

type ListType = { title: string; val: number }[]
@Component({
  standalone: true,
  imports: [ImageCropperComponent, FileUploadModule,CommonModule],
  selector: 'app-uploaddialog',
  templateUrl: './uploaddialog.component.html',
  styleUrls: ['./uploaddialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>; // Reference to canvas element
  id = 0
  transform: ImageTransform = {};
  rotation = 0;
  showCropper = false;
  public imageFile: any;
  public croppedImage: any;

  constructor() {
 
    let request = JSON.parse(localStorage.getItem('user'))
   
  }

  ngOnInit(): void {
  }
  
  onBasicUpload() {
    debugger
  }
  rotateLeft() {
    this.rotation -= 90;
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  rotateRight() {
    this.rotation += 90;
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }
  onFileSelected(e: any) {
    this.imageFile = e.files[0];
    this.showCropper=true;
  }
  
  imageCropped(e: ImageCroppedEvent) {}
  imageLoaded(e: LoadedImage) {}
  cropperReady() {}
  loadImageFailed() {}
}
