import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ElabelService } from '../../service/elabel.service';
import { UserService } from '../../service/user.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BrandService } from '../../service/brand.service';
import { PrimeIcons } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';
import { ImageCroppedEvent } from '../uploaddialog/image-cropper/image-cropper.component';
import { DomSanitizer } from '@angular/platform-browser';

interface ImageTransform {
    scale?: number;
    rotate?: number;
    flipH?: boolean;
    flipV?: boolean;
    translateH?: number;
    translateV?: number;
    translateUnit?: '%' | 'px';
  }

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    qrDialog = false
    qr = ''
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
    brandId = 0
    types = []
    userid = 0
    user: any = {}
    items: MenuItem[];
    items_brand: MenuItem[];
    items_elabel: MenuItem[];
    public imageFile: any;
    public croppedImage: any;
    loading: boolean = false;
    canvasRotation = 0;
    translateH = 0;
    translateV = 0;
    transform: ImageTransform = {
        scale: 1,
        rotate: 0,
        flipH: false,
        flipV: false,
        translateUnit: 'px'
      };
    form = this.fb.group({
        id: 0,
        name: ['', Validators.required],
        user_id: null,
        color: null,
        image: null,

    })
    address
    cap
    locality
    pr

    constructor(private router: Router, private fb: FormBuilder,private confirmationService : ConfirmationService, private messageService: MessageService, private brandService: BrandService, private userService: UserService, private service: ElabelService, public layoutService: LayoutService, private sanitizer: DomSanitizer) {

        let request = JSON.parse(localStorage.getItem('user'))
        this.companyName.setValue(request.company_name)
        this.address=request.address
        this.cap=request.cap
        this.locality=request.locality
        this.pr=request.pr
        this.userid = request.id
        this.user = request
        this.service.all(this.userid).subscribe((response: any) => {
            this.labelsDraft = response.data.filter((e) => e.status == 0)
            this.labelsPublishied = response.data.filter((e) => e.status == 1)
            this.labels = response.data
        })
        this.brandService.all(this.userid).subscribe((response) => {
            this.brands = response.data
            this.brandModal = false
        })
    }

    onBasicUpload() {
        this.userService.get(this.userid).subscribe((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            this.user = response.data
        })
    }

    ngOnInit() {
        this.items = [
            { label: 'Duplica', icon: 'pi pi-fw pi-copy' }
        ];
        this.items_brand = [
            { label: 'Modifica Brand 2', icon: 'pi pi-fw pi-pencil', 
                command: (e: any) => {
                this.editBrand(e.id);
            }},
            { label: 'Qr Code', icon: 'pi pi-fw pi-qrcode' },
            { label: 'Nuova E-Label', icon: 'pi pi-fw pi-plus' },
        ];
        this.items_elabel = [
            {
                label: 'Modifica Brand', icon: 'pi pi-fw pi-pencil',
                command: (e) => {
                    //this.editBrand(29);
                }
            },
            { label: 'Qr Code', icon: 'pi pi-fw pi-qrcode' },
            { label: 'Duplica', icon: 'pi pi-fw pi-copy' },
        ];



    }

    submit() {

        this.service.create({
            'public_id': this.id.value,
            'sku': this.sku.value,
            'product_name': this.name.value,
            'user_id': this.userid.toString()
        }).subscribe((response) => {
            this.router.navigateByUrl('/elabel/' + response.id);
        })
    }
    getMenuItemsForItemBrand(item: MenuItem): MenuItem[] {
        const context = item;
        return [
            { label: 'Modifica Brand', icon: 'pi pi-fw pi-pencil', command: e => this.editBrand(context.id) },
            { label: 'Qr Code', icon: 'pi pi-fw pi-qrcode' },
            { label: 'Nuova E-Label', icon: 'pi pi-fw pi-plus' },
        ]
    }
    getMenuItemsForItemElabel(item: MenuItem): MenuItem[] {
        const context = item;
        return [
            { label: 'Modifica ELabel', icon: 'pi pi-fw pi-pencil', command: (click)=>{this.router.navigate(['/elabel/' + context.id]);} },
            { label: 'Qr Code', icon: 'pi pi-fw pi-qrcode' },
            { label: 'Nuova E-Label', icon: 'pi pi-fw pi-plus' },
        ]

    }

    open(element) {
        this.router.navigateByUrl('customer/' + element.id)
    }

    save() {

    }

    saveBrand() {
        this.form.get('name').setValue(this.name.value)
        this.form.get('user_id').setValue(this.userid)
        this.brandService.save(this.form.value).subscribe((response) => {
            this.form.patchValue(response)
            this.brandService.all(this.userid).subscribe((response) => {
                this.brands = response.data
                this.brandModal = false
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
            })
        })
    }

    onSelect(e: FileSelectEvent) {
        console.log('FileUploadEvent', e);
        this.imageFile =e.files[0];
    }

    imageCropped(event: any) {
        const imageUrl = event.objectUrl || event.base64 || '';
        this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        if (imageUrl.startsWith('data:')) {
          const base64Data = imageUrl.split(',')[1];
          const mimeType = imageUrl.split(';')[0].split(':')[1];
        //   this.imageBase64 = base64Data;
        //   this.imageExtension = mimeType.split('/')[1];
          this.applyTransform();
        }
    }
      rotateLeft() {
      this.loading = true;
      setTimeout(() => {
        this.canvasRotation--;
        this.flipAfterRotate();
      });
    }
    rotateRight() {
      this.loading = true;
      setTimeout(() => {
        this.canvasRotation++;
        this.flipAfterRotate();
      });
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
        };
        this.translateH = 0;
        this.translateV = 0;
      }

    private applyTransform() {
        const cropperImageElement = document.querySelector('.cropper-wrapper img') as HTMLElement;
        const croppedImageElement = document.querySelector('.popup-image') as HTMLElement;
        const { scale, rotate, flipH, flipV } = this.transform;
        let transformString = `scale(${scale || 1}) rotate(${rotate || 0}deg)`;
        if (flipH) {
          transformString += ' scaleX(-1)';
        }
        if (flipV) {
          transformString += ' scaleY(-1)';
        }
        if (cropperImageElement) {
          cropperImageElement.style.transform = transformString;
        }
        if (croppedImageElement) {
          croppedImageElement.style.transform = transformString;
        }
      }

    
    imageLoaded(e: any) {
    }
    cropperReady() {
    }
    loadImageFailed() {
    }

    // onFileUpload(event:any){
    //     event;
    // }

    // onBasicUploadBrand() {
    //     this.brandService.get(this.form.get('id').value).subscribe((response) => {
    //         this.form.patchValue(response.data)
    //     })
    // }
    openBrandModal() {
        this.step = 0;
        this.form.get('id').setValue(null)
        this.form.get('name').setValue('')
        this.name.setValue('')
        this.form.get('image').setValue('')
        this.brandService.create({ name: '' + Date.now(), user_id: this.userid }).subscribe((response) => {
            this.form.get('id').setValue(response.id)
            this.brandModal = true
        })
    }

    editBrand(id) {
        this.step = 0;
        this.brandService.get(id).subscribe((response) => {
            this.form.patchValue(response.data)
            this.name.setValue(response.data.name)
            this.brandModal = true
        })
    }

    createElabelByBrand(el: any) {
        this.service.create({
            'public_id': this.id.value,
            'sku': this.sku.value,
            'brand_id': el.id,
            'product_name': this.name.value,
            'user_id': this.userid.toString()
        }).subscribe((response) => {
            this.router.navigate(['/elabel/' + response.id]);
        })
    }

    showQrElabel(label) {
        this.qr = label.qr
        this.qrDialog = true
    }

    cloneElabel(label) {
        this.service.clone({id: label.id, userid : this.userid}).subscribe((response: any) => {
            this.service.all(this.userid).subscribe((response: any) => {
                this.labelsDraft = response.data.filter((e)=>e.status == 0)
                this.labelsPublishied = response.data.filter((e)=>e.status == 1)
                this.labels = response.data
            })
        })
    }


    deleteElabel(label: any) {
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          key: 'confirm1',
          message: 'Confermi di voler eliminare il record?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.service.deleteRecord(label.id).subscribe(()=>{
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Rimosso', detail: 'Il record è stato eliminato' });
                this.service.all(this.userid).subscribe((response: any) => {
                    this.labelsDraft = response.data.filter((e)=>e.status == 0)
                    this.labelsPublishied = response.data.filter((e)=>e.status == 1)
                    this.labels = response.data
                })                
            })

          },
          reject: () => {
          }
        });
    }

    editQrBrand(item) {
        // need qr brand
        this.qr = 'accipigna'
        this.qrDialog = true
    }

    deleteBrand(label: any) {
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          key: 'confirm1',
          message: 'Confermi di voler eliminare il record?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.brandService.deleteRecord(label.id).subscribe(()=>{
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Rimosso', detail: 'Il record è stato eliminato' });
                this.brandService.all(this.userid).subscribe((response: any) => {
                    this.brands = response.data
                })                
            })

          },
          reject: () => {
          }
        });
    }
    


}
