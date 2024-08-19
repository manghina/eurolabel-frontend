import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './userprofile.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UserProfileComponent }
    ])],
    exports: [RouterModule]
})
export class UserProfileRoutingModule { }
