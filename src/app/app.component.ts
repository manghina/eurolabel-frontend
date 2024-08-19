import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private translate: TranslateService) {
        translate.setDefaultLang('it');
        translate.use('it');
    }
    
    switchLanguage(language: string) {
    this.translate.use(language);
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
