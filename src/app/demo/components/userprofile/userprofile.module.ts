import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

import { UserProfileComponent } from './userprofile.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserProfileRoutingModule } from './userprofile-routing.module';
import { RegisterModule } from '../auth/register/register.module';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';

@NgModule({
    declarations: [UserProfileComponent],
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        RegisterModule,
        ProgressSpinnerModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        ToastModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        CardModule,
        BreadcrumbModule,
        DividerModule,
        MenuModule
    ],
})
export class UserProfileModule { }
