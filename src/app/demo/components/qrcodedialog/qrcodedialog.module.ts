import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrcodedialogComponent } from './qrcodedialog.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QrcodedialogComponent
  ],
  imports: [CommonModule, QRCodeModule, FormsModule, RadioButtonModule, TranslateModule],
  exports: [QrcodedialogComponent]
})
export class QrcodedialogModule { }
