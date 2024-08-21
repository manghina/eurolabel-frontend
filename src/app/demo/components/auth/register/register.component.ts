import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Password } from 'primeng/password';
import { AuthService } from 'src/app/demo/service/auth.service';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';




@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
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

export class RegisterComponent implements OnInit{
    @Input() edit = false
    msgs: Message[] = [];
    email = ''
    user : any = {}
    url
    loading = false;
    
    @Input() form = this.fb.group({
        id : [null, Validators.required],
        username : ['', Validators.required],
        password : ['', Validators.required],
        company_name : ['', Validators.required],
        name : ['', Validators.required],
        surname : ['', Validators.required],
        address : ['', Validators.required],
        cap : ['', Validators.required],
        locality : ['', Validators.required],
        pr : ['', Validators.required],
        state : ['', Validators.required],
        phone : ['', Validators.required],
        email : ['', Validators.required],
        website : ['', Validators.required],
        piva : ['', Validators.required],
        'primary_color' : ['', Validators.required],
        sdi : ['', Validators.required],
    })

    constructor(public layoutService: LayoutService,private userService: UserService,  private service: MessageService, private fb: FormBuilder, private authService: AuthService, public router: Router, private route: ActivatedRoute, private http: HttpClient, public messageService: MessageService,) {
        this.url = this.router.url;

       
    }

    ngOnInit() {
        if(this.edit) {
            let request = JSON.parse(localStorage.getItem('user'))
            this.form.patchValue(request)
            this.user = request
            console.log(request)
        }
    }

    save() {
        this.edit ? this.editSubmit() : this.registerSubmit()
    }

    editSubmit() {
        this.authService.editProfile(this.form.value).subscribe(
            success => {
            this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
                localStorage.setItem('user', JSON.stringify(success))
                if(this.url=='/register'){
                    this.router.navigate(['/userprofile'])
                }
        },
            error => {
                this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
            }
            
        )
    }

    registerSubmit() {
        this.authService.register(this.form.value).subscribe(()=>{
            this.authService.login(this.form.get('email').value, this.form.get('password').value).subscribe(()=>{
                
                if(this.url=='/register'){
                    this.router.navigate(['/userprofile'])
                }else{
                    this.router.navigate(['/dashboard']);
                }
            })
            
        })
    }

    onBasicUpload() {
        this.userService.get(this.user.id).subscribe((response)=>{
            localStorage.setItem('user', JSON.stringify(response.data))
            this.user = response.data
            this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
        })
    }

}
