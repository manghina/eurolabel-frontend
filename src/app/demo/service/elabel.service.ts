import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root'
})
export class ElabelService {

  constructor(private http: HttpClient) { }

  all(userid : number) {
    return this.http.get<any>(baseUrl + 'elabels/' + userid)
  }

  get(id: string) {
    return this.http.get<any>(baseUrl + 'get-elabel/' + id)
  }

  getByToken(token: string) {
    return this.http.get<any>(baseUrl + 'elabel/' + token)
  }

  create(request: any) : any {
    return this.http.put(baseUrl + 'elabel', request)
  }

  save(request: any) : any {
    return this.http.post(baseUrl + 'elabel', request)
  }

  deleteRecord(id: string) {
    return this.http.delete<any>(baseUrl + 'elabel' + id)
  }

  getOptions() {
    return this.http.get<any>(baseUrl + 'options')  
  }
}
