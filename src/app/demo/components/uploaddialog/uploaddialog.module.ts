import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadDialogComponent } from './uploaddialog.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    UploadDialogComponent
  ],
  imports: [CommonModule, FileUploadModule, FormsModule, RadioButtonModule, TranslateModule],
  exports: [UploadDialogComponent]
})
export class UploadDialogModule { } 
