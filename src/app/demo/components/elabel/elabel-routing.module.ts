import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ElabelComponent } from './elabel.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ElabelComponent }
    ])],
    exports: [RouterModule]
})
export class ElabelRoutingModule { }
