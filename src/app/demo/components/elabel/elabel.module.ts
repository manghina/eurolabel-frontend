import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ElabelRoutingModule } from './elabel-routing.module';
import { ElabelComponent } from './elabel.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { InfobuttonModule } from '../uikit/infobutton/infobutton.module';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { QRCodeModule } from 'angularx-qrcode';
import { PreviewComponent } from '../preview/preview.component';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PreviewModule } from '../preview/preview.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { QrcodedialogModule } from 'src/app/qrcodedialog/qrcodedialog.module';

@NgModule({
  declarations: [ElabelComponent],
  imports: [
    CommonModule,
    PreviewModule,
    QrcodedialogModule,
    PanelModule,
    DialogModule,
    QRCodeModule,
    RadioButtonModule,
    CheckboxModule ,
    BreadcrumbModule,
    DialogModule,
    TabViewModule,
    CardModule,
    CalendarModule,
    TranslateModule,
    FileUploadModule,
    ConfirmPopupModule,
    ButtonModule,
    InfobuttonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ChipsModule,
    ToastModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CheckboxModule,
    InputTextareaModule,
    InputTextModule,
    ElabelRoutingModule,
    TagModule,
    DividerModule,
    SidebarModule,
    ProgressSpinnerModule
  ]
})
export class ElabelModule { }
