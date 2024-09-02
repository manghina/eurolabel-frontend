import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadDialogComponent } from './uploaddialog.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageCropperModule } from './image-cropper/image-cropper.module';

@NgModule({
  declarations: [
    UploadDialogComponent
  ],
  imports: [CommonModule, ImageCropperModule, FileUploadModule, FormsModule, RadioButtonModule, TranslateModule],
  exports: [UploadDialogComponent]
})
export class UploadDialogModule { } 
