import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, lastValueFrom, map } from "rxjs";
import { baseUrl } from "./constant";

// Auth service
@Injectable({ providedIn: 'root' })
export class AuthService {
    private _loginUrl = baseUrl + "login";
    private userDetails = null;
    private refreshInterval = null;
    constructor(private http: HttpClient) { }

    register(data:any) {
        return this.http.post<any>(baseUrl + 'register', data)
    }
    
    // login method
    login(email: string, password: string): Observable<any> {
        if (this.refreshInterval != null) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
        
        return this.http.post(this._loginUrl, { email, password }).pipe(
            map(async (response: any) => {
                response.from = new Date()
                localStorage.setItem('jwt', JSON.stringify(response));
                localStorage.setItem('user', JSON.stringify(response.user));
                return response;
            })
        );
    }
    // login method
    editProfile(request: any) : any {
        return this.http.post(baseUrl + 'profile', request)
    }

    isLoginValid() {
        let jwt: any = localStorage.getItem("jwt");
        if (jwt != undefined && jwt != null) {
            jwt = JSON.parse(jwt);
            let t = new Date()     
            t.setSeconds(t.getSeconds() + jwt.expires_in);
            return new Date() < t
        } else {
            return false;
        }
    }

    getAuthorizationToken(): any {
        let jwt: any = localStorage.getItem("jwt");
        if (jwt != undefined && jwt != null) {
            jwt = JSON.parse(jwt);
            return jwt.access_token;
        } else {
            return null;
        }
    }

    isLoggedIn(): Observable<any> {
        return new Observable((x) => {
            setTimeout(() => {
                const user = localStorage.getItem("user");
                if (user != null && user != undefined) {
                    x.next(true);
                } else {
                    x.next(false);
                }
            },2000)

        });
    }

    // You need to make a request to the server as well
    logout() {
        this.http.post(baseUrl + "logout", {}).subscribe(async response => {
            console.log("Logout: ", response);

        })
        if (this.refreshInterval != null) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
    }

    async getDataFromLocalStorage(key: string): Promise<any>{
        return localStorage.getItem(key);
      }
}
