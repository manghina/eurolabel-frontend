import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { FixMeLater, QRCodeElementType, QRCodeErrorCorrectionLevel } from 'angularx-qrcode';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';

type ListType = { title: string; val: number }[]
@Component({
  standalone: true,
  imports: [ImageCropperComponent, FileUploadModule],
  selector: 'app-uploaddialog',
  templateUrl: './uploaddialog.component.html',
  styleUrls: ['./uploaddialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>; // Reference to canvas element
  id = 0

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
  
  onFileSelected(e: any) {
    this.imageFile = e.files[0];
  }
  
  imageCropped(e: ImageCroppedEvent) {}
  imageLoaded(e: LoadedImage) {}
  cropperReady() {}
  loadImageFailed() {}
}
