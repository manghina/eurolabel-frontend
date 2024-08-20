import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

import { EditProfileComponent } from './edit-profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { RegisterModule } from '../auth/register/register.module';

@NgModule({
    declarations: [EditProfileComponent],
    imports: [
        CommonModule,
        EditProfileRoutingModule,
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
    ],
})
export class EditProfileModule { }
