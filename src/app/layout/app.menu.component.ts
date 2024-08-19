import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Collegamenti rapidi',
                items: [
                    { label: 'Dasbhoarad', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Brand', icon: 'pi pi-fw pi-box', routerLink: ['/'] },
                    { label: 'E-labels', icon: 'pi pi-fw pi-id-card', routerLink: ['/elabel'] }
                ]
            }
        ];
    }
}
