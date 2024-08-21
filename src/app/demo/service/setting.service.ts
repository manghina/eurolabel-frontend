import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }

  all(userid : number) {
    return this.http.get<any>(baseUrl + 'settings/'+ userid)
  }

  get(id: number) {
    return this.http.get<any>(baseUrl + 'setting/' + id)
  }

  create(request: any) : any {
    return this.http.put(baseUrl + 'setting', request)
  }

  save(request: any) : any {
    return this.http.post(baseUrl + 'setting', request)
  }

  deleteRecord(id: string) {
    return this.http.delete<any>(baseUrl + 'setting' + id)
  }

}
