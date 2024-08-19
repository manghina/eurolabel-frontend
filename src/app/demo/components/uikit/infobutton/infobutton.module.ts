import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { InfobuttonComponent } from './infobutton.component';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule
    ],
    declarations: [InfobuttonComponent],
    exports : [InfobuttonComponent],
})
export class InfobuttonModule { }
