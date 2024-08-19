import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { dummyData } from 'src/app/demo/service/constant';
import { LayoutService } from 'src/app/layout/service/app.layout.service';




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    loading = false;
    email = dummyData ? 'admin@gmail.com' : ''
    password = dummyData ? '12341234' : ''
    valCheck: string[] = ['remember'];

    constructor(public layoutService: LayoutService, private authService: AuthService, public router: Router, private route: ActivatedRoute, private http: HttpClient, public messageService: MessageService,) {
        const valid = this.authService.isLoginValid()
        if(valid)
            this.router.navigate(['/dashboard']);
    }

    ngOnInit() {
        // this.authService.Logout();
    }

    login() {
        this.loading = true;
        this.authService.login(this.email, this.password).subscribe(response => {
            this.loading = false;
            this.router.navigate(['/dashboard']);
        },
            error => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Accesso fallito', detail: 'Username o password non validi' });
            });
    }

    register() {
        this.router.navigate(['/register']);
    }

}
