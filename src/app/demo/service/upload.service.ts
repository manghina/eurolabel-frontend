import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UploadService {
    constructor(private http:HttpClient) { }

    upload(url,file){
        const formData=new FormData();
        formData.append("image", file);
        return this.http.post(url,formData)
    }
    
}