import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../demo/service/auth.service';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    menuItems: MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private authService: AuthService, public router: Router) {
        this.menuItems = [
            {
                label: 'Logout', icon: 'pi pi-sign-out', command: () => {
                    this.authService.logout();
                    this.router.navigate([''])
                }
            },
        ];
    }
    logout() {
        this.authService.logout()
        this.router.navigate(['/auth'])
    }

    
    edit() {
        this.router.navigateByUrl('userprofile')
    }
}
