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
import { ElabelViewRoutingModule } from './elabel-view-routing.module';
import { ElabelViewComponent } from './elabel-view.component';
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
import { QrcodedialogComponent } from 'src/app/qrcodedialog/qrcodedialog.component';
import { PreviewModule } from '../preview/preview.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [ElabelViewComponent],
  imports: [
    CommonModule,
    PreviewModule,
    ProgressSpinnerModule,
    PanelModule,
    DialogModule,
    QRCodeModule,
    RadioButtonModule,
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
    ElabelViewRoutingModule,
    TagModule,
    DividerModule,
    SidebarModule
  ]
})
export class ElabelViewModule { }
