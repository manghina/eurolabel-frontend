import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadDialogComponent } from './uploaddialog.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageCropperComponent  } from 'ngx-image-cropper';
import {SliderModule} from 'primeng/slider';


@NgModule({
  declarations: [
    UploadDialogComponent
  ],
  imports: [CommonModule, FileUploadModule, FormsModule, ReactiveFormsModule, RadioButtonModule, TranslateModule, ImageCropperComponent,SliderModule],
  exports: [UploadDialogComponent]
})
export class UploadDialogModule { } 
