import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './demo/auth.guard';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { FormLayoutDemoComponent } from './demo/components/uikit/formlayout/formlayoutdemo.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', redirectTo: '/login', pathMatch: 'full' },
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'login', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
                    { path: 'userprofile', loadChildren: () => import('./demo/components/userprofile/userprofile.module').then(m => m.UserProfileModule) },
                    { path: 'edit', loadChildren: () => import('./demo/components/edit-profile/edit-profile.module').then(m => m.EditProfileModule) },
                    { path: 'elabel', loadChildren: () => import('./demo/components/elabel/elabel.module').then(m => m.ElabelModule) },
                    { path: 'elabel/:id', loadChildren: () => import('./demo/components/elabel/elabel.module').then(m => m.ElabelModule) },
                    
                    { path: 'elabel-brand/:brand', loadChildren: () => import('./demo/components/elabel/elabel.module').then(m => m.ElabelModule) },
                ],
                canActivate: [AuthGuard]
                // http://localhost:4200/frontend/#/viewelabel/5
            },
            {
                path: 'uikit', component: FormLayoutDemoComponent,
            },
            { path: 'register', loadChildren: () => import('./demo/components/auth/register/register.module').then(m => m.RegisterModule) },
            { path: 'viewelabel/:id', loadChildren: () => import('./demo/components/elabel-view/elabel-view.module').then(m => m.ElabelViewModule) },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
