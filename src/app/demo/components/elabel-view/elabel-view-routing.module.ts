import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ElabelViewComponent } from './elabel-view.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ElabelViewComponent }
    ])],
    exports: [RouterModule]
})
export class ElabelViewRoutingModule { }
