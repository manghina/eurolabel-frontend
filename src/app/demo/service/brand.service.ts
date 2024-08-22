import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  all(userid : number) {
    return this.http.get<any>(baseUrl + 'brands/'+ userid)
  }

  get(id: number) {
    return this.http.get<any>(baseUrl + 'brand/' + id)
  }

  create(request: any) : any {
    return this.http.put(baseUrl + 'brand', request)
  }

  save(request: any) : any {
    return this.http.post(baseUrl + 'brand', request)
  }

  deleteRecord(id: string) {
    return this.http.delete<any>(baseUrl + 'brand/' + id)
  }

}
