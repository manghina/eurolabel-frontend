import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { baseUrl } from '../../../service/constant';
import { SharedService } from '../../../service/shared.service';

@Component({
    templateUrl: './formlayoutdemo.component.html',
    providers: [MessageService]
})
export class FormLayoutDemoComponent {
    form: FormGroup;
    startValue = new Date();
    selectedState: any = null;
    customerInfo: any = {
        Id_Titolo: '',
        Anno_iscrizione: '',
        Data_ultimo_pagamento: new Date(),
        Anno_ultimo_pagamento: '',
        Nominativo: '',
        Cognome: '',
        id_Carica: '',
        id: '',
        Presso: '',
        Indirizzo: '',
        CAP: '',
        Città: '',
        PR: '',
        Telefono: '',
        Cellulare: '',
        Email: '',
        Email1: '',
        Fax: '',
        id_categoria: '',
        id_sezioni: '',
        Annotazioni_varie: '',
        Ambito_professionale: '',
        socio: '',
        Rivista: '',
        Stampa: '',
        NewsLetter: '',
        Ordini: '',
        Nuovo: '',
        Esportare: '',
        Esportato: '',
    }
    loading = false;
    states: any[] = [
        { name: 'Arizona', code: 'Arizona' },
        { name: 'California', value: 'California' },
        { name: 'Florida', code: 'Florida' },
        { name: 'Ohio', code: 'Ohio' },
        { name: 'Washington', code: 'Washington' },
    ];
    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' },
    ];
    categoria: any[] = [];
    titolo: any[] = [];
    carica: any[] = [];
    sezione: any[] = [];

    constructor(
        private fb: FormBuilder,
        public sharedService: SharedService,
        private http: HttpClient,
        public messageService: MessageService,
        private router: Router
    ) {
        this.form = this.fb.group({
            Id_Titolo: new FormControl(null),
            Anno_iscrizione: new FormControl(null),
            Data_ultimo_pagamento: new FormControl(null),
            Anno_ultimo_pagamento: new FormControl(null),
            Nominativo: new FormControl(null),
            Cognome: new FormControl(null),
            id_Carica: new FormControl(null),
            id: new FormControl(null),
            Presso: new FormControl(null),
            Indirizzo: new FormControl(null),
            CAP: new FormControl(null),
            Città: new FormControl(null),
            PR: new FormControl(null),
            Telefono: new FormControl(null),
            Cellulare: new FormControl(null),
            Email: new FormControl(null),
            Email1: new FormControl(null),
            Fax: new FormControl(null),
            id_categoria: new FormControl(null),
            id_sezioni: new FormControl(null),
            Annotazioni_varie: new FormControl(null),
            Ambito_professionale: new FormControl(null),
            socio: new FormControl(false),
            Rivista: new FormControl(false),
            Stampa: new FormControl(false),
            NewsLetter: new FormControl(false),
            Ordini: new FormControl(false),
            Nuovo: new FormControl(false),
            Esportare: new FormControl(false),
            Esportato: new FormControl(false),
        });
    }

    ngOnInit() {
        this.loading = true
        debugger
        if (this.sharedService.shareValue) {
            this.http
                .get(
                    baseUrl +
                    'getCustomer/' + this.sharedService.shareValue,
                    {}
                )
                .subscribe((response: any) => {
                    this.customerInfo = response.customer[0];
                    this.categoria = response.categoria
                    this.carica = response.carica
                    this.sezione = response.sezione
                    this.titolo = response.titolo
                    this.populateFormValues();
                    this.loading = false
                });
        } else {

            this.http
                .get(
                    baseUrl +
                    'fetch/',
                    {}
                )
                .subscribe((response: any) => {
                    this.categoria = response.categoria
                    this.carica = response.carica
                    this.sezione = response.sezione
                    this.titolo = response.titolo
                    this.loading = false
                });
        }
    }

    populateFormValues() {
        if (this.customerInfo) {
            const checkbox = ["socio", "Rivista", "Stampa", "NewsLetter", "Ordini", "LD", "Nuovo", "Esportare", "Esportato"]

            for (let control of checkbox) {
                const value = this.customerInfo[control]
                if (value == 0)
                    this.customerInfo[control] = false
                else
                    this.customerInfo[control] = true
            }

            this.form.patchValue(this.customerInfo);
            this.form.get('Id_Titolo').setValue(
                this.titolo.filter((el) => el.code == this.customerInfo.Id_Titolo)[0]
            );
            this.form.get('id_categoria').setValue(
                this.categoria.filter((el) => el.code == this.customerInfo.id_categoria)[0]
            );
            this.form.get('id_Carica').setValue(
                this.carica.filter((el) => el.code == this.customerInfo.id_Carica)[0]
            );
            this.form.get('id_sezioni').setValue(
                this.sezione.filter((el) => el.code == this.customerInfo.id_sezioni)[0]
            );
            const Data_ultimo_pagamento =
                this.customerInfo.Data_ultimo_pagamento;
            const parts = Data_ultimo_pagamento.split(' ');
            this.form.get('Data_ultimo_pagamento').setValue(parts[0]);
            this.startValue = new Date(parts[0]);
        }
    }


    updateCustomerInfo() {
        this.loading = true
        const request = this.form.value
        request.Data_ultimo_pagamento =
            this.startValue.getFullYear() + "-"
            + (this.startValue.getMonth() + 1) + "-"
            + (this.startValue.getDate() + 1)
        request.socio = this.customerInfo.socio
        request.Rivista = 0
        request.Stampa = this.customerInfo.Stampa
        request.NewsLetter = this.customerInfo.NewsLetter
        request.Ordini = this.customerInfo.Ordini
        request.LD = this.customerInfo.LD
        this.http
            .post(
                baseUrl + 'updateCustomer/' + this.sharedService.shareValue,
                request
            )
            .subscribe((response: any) => {
                this.loading = false
                this.form.get('id').setValue(response.id)
                this.messageService.add({ severity: 'success', summary: 'Dati aggiornati', detail: 'Le modifiche sono state salvate' });
            });
    }

    saveCustomerInfo() {
        this.loading = true
        const request = this.form.value
        request.Data_ultimo_pagamento =
            this.startValue.getFullYear() + "-"
            + (this.startValue.getMonth() + 1) + "-"
            + (this.startValue.getDate() + 1)
        /*
    request.socio = this.customerInfo.socio
    request.Rivista = 0
    request.Stampa = this.customerInfo.Stampa
    request.NewsLetter = this.customerInfo.NewsLetter
    request.Ordini = this.customerInfo.Ordini
    request.LD = this.customerInfo.LD
    */
        this.http
            .post(
                baseUrl + 'saveCustomerInfo/',
                request
            )
            .subscribe((response: any) => {
                this.loading = false
                this.sharedService.shareValue = response.id
                this.messageService.add({ severity: 'success', summary: 'Dati aggiornati', detail: 'Le modifiche sono state salvate' });
            });
    }

    filter(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.titolo as any[]).length; i++) {
            let country = (this.titolo as any[])[i];
            if (!country.Titolo)
                continue;
            if (country.Titolo.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.titolo = filtered;
    }

    onSelect(event: string) {
        this.form.get('titolo').setValue(event)
    }

    back() { }
}
