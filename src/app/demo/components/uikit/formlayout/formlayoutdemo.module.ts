import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { FormLayoutDemoRoutingModule } from './formlayoutdemo-routing.module';
import { FormLayoutDemoComponent } from './formlayoutdemo.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FormLayoutDemoRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		CheckboxModule,
		RadioButtonModule,
		InputNumberModule,
		FormsModule,
		ReactiveFormsModule,
		CascadeSelectModule,
		DropdownModule,
		MultiSelectModule,
		ProgressSpinnerModule,
		ToastModule,
		InputTextareaModule,
		InputTextModule
	],
	declarations: [FormLayoutDemoComponent],
	bootstrap: []
})
export class FormLayoutDemoModule { }
