import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { ElabelService } from '../../service/elabel.service';
import { TranslateService } from '@ngx-translate/core';
import { BrandService } from '../../service/brand.service';
import { of } from 'rxjs';
import { SettingService } from '../../service/setting.service';
import { FileUpload } from 'primeng/fileupload';
import { DropdownFilterOptions } from 'primeng/dropdown';

@Component({
  selector: 'app-elabel',
  templateUrl: './elabel.component.html',
  styleUrls: ['./elabel.component.scss']
})
export class ElabelComponent {
  @ViewChild('qrcodewrapper', { static: false }) el: ElementRef<HTMLCanvasElement>;
  @ViewChild('previewUpload') fileUpload: FileUpload;
  qrDialog = false

  form: FormGroup
  settings: FormArray
  id = ''
  brand = {}
  preview_image = ''
  sustainibility_attachments = []
  sub_image = ''
  user_id = ''
  breadcrumbItems: MenuItem[] = [];
  filteredCountries: any[] = [];
  geographical_indication = 0
  options = []
  uploadedFiles = []
  type = new FormControl()
  sustainabilityImage = new FormControl()
  previewImage = new FormControl()
  ingredient = new FormControl()
  tmp = new FormControl()

  brands = []
  countries = [];
  states = [];
  consumption = [];
  containers = [];
  materials = [];
  packages = [];
  productType = [];
  types = [];
  fullIngredientList = [];
  ingredientPicked = [];
  ingredients = [];
  msgs: Message[] = [];
  preview:boolean=false
  sidebarVisible: boolean = false;
  loading: boolean = true;
  companyName=''
  primary_color=''
  companyLogo=''

  constructor(private fb: FormBuilder, private t: TranslateService, private brandService: BrandService, private settingService: SettingService, private service: ElabelService, private confirmationService: ConfirmationService, private messageService: MessageService, private _location: Location, private route: ActivatedRoute) {
    this. sidebarVisible = false;
    let request = JSON.parse(localStorage.getItem('user'))
    this.user_id = request.id
    this.companyName=request.company_name
    this.primary_color=request.primary_color
    this.companyLogo=request.image

    this.form = this.fb.group({
      id: [null, Validators.required],
      qr: ['barbino', Validators.required],
      public_id: [null, Validators.required],
      user_id: [''],
      brand_id: [null],
      status: [0],
      name: [null, Validators.required],
      alcohol_content_percentage: [null],
      net_content: [null],
      product_name: [null, Validators.required],
      sku: [null],
      country: [null, Validators.required],
      vintage_year: [null],
      packages: [null],
      geographical_indication: [null],
      description: [null],
      product_varieties: [null],
      energy_kj: ['0', Validators.required],
      energy_kcal: ['0', Validators.required],
      fat: ['0', Validators.required],
      fat_sat: ['0', Validators.required],
      carb: ['0', Validators.required],
      carb_sugar: ['0', Validators.required],
      protein: ['0', Validators.required],
      salt: ['0', Validators.required],
      drive: [false],
      pregnant: [false],
      age: [false],
      sustainibility_bio: [null],
      sustainibility_message: [null],
      rules: this.fb.array([], [this.uniquePropValidator(),this.uniquePropValidator2()]),
      ingredients: new FormArray([]),
      type: [null, Validators.required]
    })

    this.settingService.all(parseInt(this.user_id)).subscribe((response)=>{
      this.settings = new FormArray([])
      for(let setting of response.data) {
        if(setting.valueV === null)
          setting.valueV = setting.defaultV
        if(setting.type == "radio" && (setting.valueV == "true" || setting.valueV == "false"))
          setting.valueV = setting.valueV === "true"
        if(setting.type == "radio" && (setting.valueV == "1" || setting.valueV == "0"))
          setting.valueV = setting.valueV === "1"
        this.settings.push(this.fb.group(setting))
      }
    })


  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      
      let id = params.get('id');
      const brand = params.get('brand');
      if(brand) {
        const b = JSON.parse(brand)
        if(b.elabelId)
          id = b.elabelId
        this.form.get('brand_id').setValue(b)
      }
      this.service.getOptions().subscribe((response) => {
        const data = response.data
        this.consumption = data.consumption.map(e => { e.value = e.id; return e })
        let containers = data.containers.map(e => { e.value = e.id; return e })
        this.geographical_indication = data.countries.map(e => { e.value = e.id; return e })
        let materials = data.materials.map(e => { e.value = e.id; return e })
        this.states = data.states.map(e => { e.value = e.nome_stati; return e })
        this.packages = data.packages.map(e => { e.value = e.id; return e })
        this.productType = data.productType.map(e => { e.value = e.id; return e })
        this.types = data.types.map(e => { e.value = e.id; return e })
        this.fullIngredientList = data.ingredients
        let ingredients = data.ingredients.map(e => { e.value = e.id; return e })

        // containers = containers
        //   .reduce((acc, obj) => {
        //     const key = obj.group;
        //     if (!acc[key]) {
        //       acc[key] = [];
        //     }
        //     acc[key].push(obj);
        //     return acc;
        //   }, {});
        // for (let c in containers) {
        //   const key = c;
        //   const items = containers[c];
        //   this.containers.push({
        //     label: c,
        //     items: items
        //   })
        // }

        // materials = materials
        //   .reduce((acc, obj) => {
        //     const key = obj.group;
        //     if (!acc[key]) {
        //       acc[key] = [];
        //     }
        //     acc[key].push(obj);
        //     return acc;
        //   }, {});
        // for (let c in materials) {
        //   const key = c;
        //   const items = materials[c];
        //   this.materials.push({
        //     label: c,
        //     items: items
        //   })
        // }

        // ingredients = ingredients
        //   .reduce((acc, obj) => {
        //     const key = obj.group;
        //     if (!acc[key]) {
        //       acc[key] = [];
        //     }
        //     acc[key].push(obj);
        //     return acc;
        //   }, {});
        // for (let c in ingredients) {
        //   const key = c;
        //   const items = ingredients[c];
        //   this.ingredients.push({
        //     label: c,
        //     items: items
        //   })
        // }

        // Group containers, materials, and ingredients by their respective groups
        containers = this.groupBy(containers, 'group');
        materials = this.groupBy(materials, 'group');
        ingredients = this.groupBy(ingredients, 'group');

        // Populate dropdowns
        this.populateDropdown(this.containers, containers);
        this.populateDropdown(this.materials, materials);
        this.populateDropdown(this.ingredients, ingredients);

        // Data has been fully loaded, so we can hide the spinner and show the dropdowns
        this.loading = false;
      })
      this.brandService.all(parseInt(this.user_id)).subscribe((response)=>{
        this.brands = response.data
        if (id) {
          this.id = id
          this.get()
        }
      })   
    });
  }
  // Utility function to group items by a specific key
  groupBy(array, key) {
    return array.reduce((acc, obj) => {
      const groupKey = obj[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(obj);
      return acc;
    }, {});
  }

  // Utility function to populate dropdowns
  populateDropdown(dropdownArray, groupedData) {
    for (let groupKey in groupedData) {
      dropdownArray.push({
        label: groupKey,
        items: groupedData[groupKey]
      });
    }
  }

  save() {
    console.log(this.form.value)
    this.service.save(this.form.value).subscribe(
      (response) => {
        this.showBottomCenter()
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
      },
      error => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
      }
    )
  }

  back() {
    this._location.back();
  }
  onChangeIngredient($event) {
    const id = $event.value
    const option = this.fullIngredientList.filter((e) => e.id == id)
    if(!this.isIngredientPresent(id)) {
      this.ingredientPicked.push(option[0])
      this.formIngredients.push(this.fb.group(option[0]))
    }
    this.ingredientPicked = [...this.ingredientPicked]
    
  }

  onDeleteIngredient(i:number, id:number) {
    this.formIngredients.removeAt(i)
    this.ingredientPicked = this.ingredientPicked.filter((e)=>e.id !=id)
  }

  isIngredientPresent(id:number) {
    return this.ingredientPicked.filter((e)=>e.id ==id).length != 0
  }

  onChangeContainer(id:number) {
    const rules = this.rules.value
    return rules.filter((e)=>e.recycling_rule_containers_id ==id).length != 0
  }

  onChangeMaterial(id:number) {
    const rules = this.rules.value
    return rules.filter((e)=>e.recycling_rule_materials_id ==id).length != 0
  }

  isIngredientNotInUse(option: any) {
    const items = this.ingredientPicked.filter((e)=> e.id ==option.id )
    return items.length == 0
  }

  isContainerNotInUse(option: any) {
    const rules = this.rules.value
    return rules.filter((e)=>e.recycling_rule_containers_id ==option.id).length == 0
  }

  isMaterialNotInUse(option: any) {
    const rules = this.rules.value
    return rules.filter((e)=>e.recycling_rule_materials_id ==option.id).length == 0
  }

  isRulePresent(id:number) {
    return this.rules.controls.filter((e)=>e.get('id').value ==id).length != 0
  }

  searchCountry(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  deleteRecord(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Confermi di voler eliminare il record?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteRecord(this.id).subscribe((response) => {
          this.back()
        })
      },
      reject: () => {
      }
    });
  }

  showBottomCenter() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Successo', detail: 'Il record è stato aggiornato' });
  }

  addRule() {
    const rule = this.fb.group({ recycling_rule_containers_id: new FormControl(), recycling_rule_materials_id: new FormControl() })
    this.rules.push(rule)
  }

  removeRule(i: number) {
    this.rules.removeAt(i);
  }

  get rules(): FormArray {
    return this.form.get('rules') as FormArray;
  }

  get formIngredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  onBasicUpload() {
    this.get()
  }
  get() {
    this.service.get(this.id).subscribe((response) => {
      this.form.patchValue(response.data)
      if (response.data.vintage_year) {
        this.form.get('vintage_year').setValue(new Date(response.data.vintage_year))
      }
     
      if (response.data.brand) {
        this.form.get('brand_id').setValue(response.data.brand)
      }

      if (response.data.geographical_indication.length) {
        this.form.get('geographical_indication').setValue(parseInt(response.data.geographical_indication[0].geographical_indication_id))
      }

      for (let option of response.data.ingredients) {
        this.ingredientPicked.push(option)
        this.formIngredients.push(this.fb.group(option))
      }
      for (let option of response.data.recycling_rules) {
        option.recycling_rule_materials_id = parseInt(option.recycling_rule_materials_id)
        option.recycling_rule_containers_id = parseInt(option.recycling_rule_containers_id)
        this.rules.push(this.fb.group(option))
      }

      if (response.data.type) {
        this.form.get('type').setValue(parseInt(response.data.type))
      }
      if (response.data.packages.length) {
        this.form.get('packages').setValue(parseInt(response.data.packages[0].package_id))
      }

     if (response.data.sub_image) {
        this.sub_image = response.data.sub_image
      } 
      if (response.data.sustainibility_attachments) {
        this.preview_image = response.data.sustainibility_attachments
      }

    /*   if (response.data.preview_image) {
        this.preview_image = response.data.preview_image
      } */
      if (response.data.sustainibility_attachments) {
        this.sustainibility_attachments = response.data.sustainibility_attachments
      }

      

      this.breadcrumbItems = [];
      this.breadcrumbItems.push({ label: 'E-labels', routerLink : "/dashboard" });
      this.breadcrumbItems.push({ label: this.form.get('product_name').value });
      this.breadcrumbItems = [...this.breadcrumbItems]
    })
  }

  deletePreviewImage(image) {
    this.service.deletePreviewImage(image).subscribe(()=>{
      this.get()
    })
  }

  uniquePropValidator() {
    return (formArray: FormArray) => {
      const values = formArray.controls.map(group => group.get('recycling_rule_containers_id')?.value);
      const hasDuplicates = values.some((value, index) => values.indexOf(value) !== index);
      return hasDuplicates ? { nonUniqueContainer: true } : null;
    };
  }

  uniquePropValidator2() {
    return (formArray: FormArray) => {
      const values = formArray.controls.map(group => group.get('recycling_rule_materials_id')?.value);
      const hasDuplicates = values.some((value, index) => values.indexOf(value) !== index);
      return hasDuplicates ? { nonUniqueMaterial: true } : null;
    };
  }

  changeStatus() {
    const v = this.form.get('status').value
    v == 0 ? this.form.get('status').setValue(1) : this.form.get('status').setValue(0)
    this.service.changeStatus({
      id: this.id,
      status : v == 0 ? 1 : 0
    }).subscribe(()=>{})
  }

  downloadCanvas() {
    const name = this.toSnakeCase(this.form.get('product_name').value)
    const canvas =  this.el.nativeElement.firstChild.firstChild.firstChild as any
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = name + 'code.png';
    link.click();
  }  
  toSnakeCase(str: string) {
    return str
        .trim()                               // Remove leading/trailing whitespace
        .toLowerCase()                        // Convert the string to lowercase
        .replace(/[\s_-]+/g, '_')             // Replace spaces, hyphens, and underscores with a single underscore
        .replace(/[^\w]+/g, '')               // Remove all non-word characters except underscores
        .replace(/^_+|_+$/g, '');             // Remove leading or trailing underscores
}  

getMaterialLabel(i:number) {
  const drule = this.rules.at(i).get('recycling_rule_materials_id').value
  for(let r of this.materials) {
    const rule = r.items.filter((e)=>e.id==drule)
    if(!rule.length)
      continue
    
    return rule[0].label
  }
  return ''
}

getMaterialLabelPart(label:string) {
  if(!label)
    return ''
  const group = label.split(" - ")[1]
  return group.split(" ")[0]
}

getMaterialNumberPart(label:string) {
  if(!label)
    return ''
  const group = label.split(" - ")[1]
  return group.split(" ")[1]

}

saveSetting() {
  this.settingService.save({data : this.settings.value}).subscribe(
    (response) => {
      this.showBottomCenter()
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    },
    error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }
  )
}


}
