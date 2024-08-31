import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from './image-cropper/image-cropper.component';

@Component({
  selector: 'app-uploaddialog',
  templateUrl: './uploaddialog.component.html',
  styleUrls: ['./uploaddialog.component.scss']
})
export class UploadDialogComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;
  uploadedFiles: any[] = [];


  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  loadImageFailed () {
    console.log('Load failed');
  }

  onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }


  
}
