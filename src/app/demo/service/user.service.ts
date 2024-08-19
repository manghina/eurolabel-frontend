import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(id: number) : any {
    return this.http.get(baseUrl + 'user/' + id)
  }

  save(request: any) : any {
    return this.http.post(baseUrl + 'user', request)
  }


}
