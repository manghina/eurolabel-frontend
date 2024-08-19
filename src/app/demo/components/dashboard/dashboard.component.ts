import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ElabelService } from '../../service/elabel.service';
import { UserService } from '../../service/user.service';
import { MenuItem, MessageService } from 'primeng/api';
import { BrandService } from '../../service/brand.service';
import { PrimeIcons } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    left = PrimeIcons.ARROW_LEFT
    right = PrimeIcons.ARROW_RIGHT
    step = 0
    brands = []
    labels = []
    labelsDraft = []
    labelsPublishied = []
    published = []
    draft = []
    display = false
    brandModal = false
    companyName = new FormControl()
    radio = new FormControl()
    name = new FormControl()
    sku = new FormControl()
    user_id = new FormControl()
    id = new FormControl()
    brandId=0
    types = []
    userid = 0
    user : any = {}
    items: MenuItem[];
    items_brand: MenuItem[];
    items_elabel: MenuItem[];

    form = this.fb.group( {
        id : 0,
        name: ['', Validators.required],
        user_id : null,
        color : null,        
        image : null,
        
    })
    
    constructor(private router: Router,private fb: FormBuilder, private messageService: MessageService, private brandService: BrandService, private userService: UserService, private service: ElabelService, public layoutService: LayoutService) {

        let request = JSON.parse(localStorage.getItem('user'))
        this.companyName.setValue(request.company_name)   
        this.userid = request.id     
        this.user = request
        this.service.all(this.userid).subscribe((response: any) => {
            this.labelsDraft = response.data.filter((e)=>e.status == 0)
            this.labelsPublishied = response.data.filter((e)=>e.status == 1)
            this.labels = response.data
        })        
        this.brandService.all(this.userid).subscribe((response)=>{
            this.brands = response.data
            this.brandModal = false
        })        
    }

    onBasicUpload() {
        this.userService.get(this.userid).subscribe((response)=>{
            localStorage.setItem('user', JSON.stringify(response.data))
            this.user = response.data
        })
    }

    ngOnInit() {
        this.items = [
            { label: 'Duplica', icon: 'pi pi-fw pi-copy' }
        ];
        this.items_brand = [
            { label: 'Modifica Brand', icon: 'pi pi-fw pi-pencil', 
                command: () => {
                this.editBrand(29);
            }},
            { label: 'Qr Code', icon: 'pi pi-fw pi-qrcode' },
            { label: 'Nuova E-Label', icon: 'pi pi-fw pi-plus' },
        ];
        this.items_elabel = [
            { label: 'Modifica Brand', icon: 'pi pi-fw pi-pencil' },
            { label: 'Qr Code', icon: 'pi pi-fw pi-qrcode' },
            { label: 'Duplica', icon: 'pi pi-fw pi-copy' },
        ];



    }

    submit() {
       
        this.service.create({
            'public_id' : this.id.value,
            'sku' : this.sku.value,
            'product_name' : this.name.value,
            'user_id': this.userid.toString()
        }).subscribe((response) => {
            this.router.navigateByUrl('/elabel/' + response.id);
        })
    }


    open(element) {
        this.router.navigateByUrl('customer/' + element.id)
    }

    save() {
        /*
        this.edit = false
        let request = JSON.parse(localStorage.getItem('user'))
        request.company_name = this.companyName.value;
        this.userService.save(request).subscribe((response)=>{
            localStorage.setItem('user', JSON.stringify(response))
            this.user = response
            this.edit = false;
        })
        */
    }

    saveBrand() {
        this.form.get('name').setValue(this.name.value)
        this.form.get('user_id').setValue(this.userid)
        this.brandService.save(this.form.value).subscribe((response)=>{
            this.form.patchValue(response)
            this.brandService.all(this.userid).subscribe((response)=>{
                this.brands = response.data
                this.brandModal = false
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
            })
        })
    }

    onBasicUploadBrand() {
        this.brandService.get(this.form.get('id').value).subscribe((response)=>{
            this.form.patchValue(response.data)
        })
    }
    openBrandModal() {
        this.step = 0;
        this.form.get('id').setValue(null)
        this.form.get('name').setValue('')
        this.name.setValue('')
        this.form.get('image').setValue('')
        this.brandService.create({name:'' + Date.now(), user_id: this.userid}).subscribe((response)=>{
            this.form.get('id').setValue(response.id)
            this.brandModal=true
        })
    }

    editBrand(id) {
        this.step = 0;
        this.brandService.get(id).subscribe((response)=>{
            this.form.patchValue(response.data)
            this.name.setValue(response.data.name)
            this.brandModal = true
        })
    }

    createElabelByBrand(el:any) {
        this.router.navigate(['/elabel-brand', JSON.stringify(el)]);
    }


    

}
