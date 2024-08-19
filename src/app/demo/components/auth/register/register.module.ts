import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { NgxColorsModule } from 'ngx-colors';

@NgModule({
    imports: [
        CommonModule,
        NgxColorsModule,
        RegisterRoutingModule,
        ProgressSpinnerModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        ToastModule,
        InputTextModule,
        FileUploadModule,
        FormsModule,
        PasswordModule,
        DividerModule,
        PasswordModule
    ],
    declarations: [RegisterComponent],
    exports: [RegisterComponent],
})
export class RegisterModule { }
