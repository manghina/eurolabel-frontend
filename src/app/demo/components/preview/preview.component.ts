import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ElabelService } from '../../service/elabel.service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnChanges, OnInit {
  @Input() brand :any
  @Input() sustainibility_attachments = []
  @Input() settings: any[] = []
  ingredients: any[] = []
  @Input() form: FormGroup
  @Input() sub_image = ''
  @Input() preview_image = ''
  @Input() preview = ''
  show_portion: boolean = false
  @Input() types = []
  @Input() packages = []
  @Input() ingredientsValue = []
  @Input() containers = []
  @Input() materials = []
  @Input() companyName = ''
  @Input() companyLogo = ''
  @Input() primary_color = ''
  @Input() geoGraphicalIndication = []
  urlPath:any = ''

  constructor(private fb: FormBuilder, public layoutService: LayoutService, private t: TranslateService, private service: ElabelService, private confirmationService: ConfirmationService, private messageService: MessageService, private _location: Location, private route: ActivatedRoute, private router: Router) {
    this.urlPath = this.router.url.split('/')[1];

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['ingredientsValue'] && changes['ingredientsValue'].currentValue.length) {
      this.ingredients = this.groupBy(changes['ingredientsValue'].currentValue, 'group')
      debugger
    }
  }
  ngOnInit(): void {
    this.ingredients = this.groupBy(this.ingredientsValue, 'group')
    debugger
  }

  save() {
    this.service.save(this.form.value).subscribe((response) => {
      this.showBottomCenter()
    })
  }

  back() {
    this._location.back();
  }

  showBottomCenter() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Successo', detail: 'Il record è stato aggiornato' });
  }

  get rules(): FormArray {
    return this.form.get('rules') as FormArray;
  }

  get formIngredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }



  getPackages(n: number) {
    if (this.packages.length > 0) {
      const item = this.packages.filter((e) => e.id == n)
      if (item.length)
        return item[0].label
    }
    return ''
  }

  getType(n: number) {
    if (this.types.length) {
      const item = this.types.filter((e) => e.id == n)
      if (item.length)
        return item[0].label
    }
    return ''
  }

  getGeographicalIndication(n: number) {
    if (this.geoGraphicalIndication.length) {
      const item = this.geoGraphicalIndication.filter((e) => e.id == n)
      if (item.length)
        return item[0].label
    }
    return ''
  }

  getContainer(n: number) {
    for (let k in this.containers) {
      for (let c of this.containers[k].items) {
        if (c.id == n) {
          return c
        }
      }
    }
    return ''
  }

  getMaterial(n: number) {
    for (let k in this.materials) {
      for (let c of this.materials[k].items) {
        if (c.id == n) {
          return c
        }
      }
    }
    return ''
  }

  getIngredient(o: any) {
    if (o.length > 0)
      return o[0].label
  }

  getMaterialLabel(i: number) {
    if (!this.rules.length)
      return ''
    const drule = this.rules.at(i).get('recycling_rule_materials_id').value
    for (let r of this.materials) {
      const rule = r.items.filter((e) => e.id == drule)
      if (!rule.length)
        continue

      return rule[0].label
    }
    return ''
  }

  getMaterialLabelPart(label: string) {
    if (!label)
      return ''
    const group = label.split(" - ")[1]
    return group.split(" ")[0]
  }

  getMaterialNumberPart(label: string) {
    if (!label)
      return ''
    const group = label.split(" - ")[1]
    return group.split(" ")[1]

  }
  getMaterialTitle(string) {
    let newString = string?.substring(0, string.indexOf(" -")).trim();
    return newString
  }
brand_name
brand_image
  getCurrentColor() {
  if(this.urlPath!='viewelabel'){
    if(this.brand.value && this.checkIfValueExists('isBrandColorActive')) {
      this.brand_name=this.brand.value?.name
      this.brand_image=this.brand.value?.image
      return this.brand.value?.color
    }
    if(this.primary_color && this.checkIfValueExists('isProfileColorActive')) {
      return this.primary_color
    }
    return 'black'
 
}else{
  if(this.brand && this.checkIfValueExists('isBrandColorActive')) {
    this.brand_name=this.brand?.name
    this.brand_image=this.brand?.image
    return this.brand?.color
  }
  if(this.primary_color && this.checkIfValueExists('isProfileColorActive')) {
    return this.primary_color
  }
  return 'black'
}

}

checkIfValueExists(value: string): boolean {
  try {
    return this.settings.filter(obj => obj.keyV === value)[0]['valueV']
  } catch (e) {
    return false
  }
}

checkValue() {
  const valueToCheck = 'value1';
  const exists = this.checkIfValueExists(valueToCheck);
  return exists
}

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

}
