import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { NgxColorsModule } from 'ngx-colors';
import { QrcodedialogModule } from 'src/app/qrcodedialog/qrcodedialog.module';

@NgModule({
    imports: [
        CommonModule,
        NgxColorsModule,
        TranslateModule,
        QrcodedialogModule,
        ToastModule,
        FormsModule,
        ChartModule,
        MenuModule,
        FileUploadModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        CheckboxModule,
        DashboardsRoutingModule,
        PaginatorModule,
        TagModule,
        InputTextModule,
        TabViewModule,
        RadioButtonModule,
        DialogModule,
        ConfirmDialogModule,
        CardModule,
        DividerModule,
        TooltipModule,
        BreadcrumbModule,
        PanelModule
    ],
    providers: [
        ConfirmationService
    ],
    declarations: [DashboardComponent],
    exports: []
})
export class DashboardModule { }
