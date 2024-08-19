import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.auth.getAuthorizationToken();
        // console.log("token is: ", authToken, req);
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        let authReq: any = req.clone({});
        if (authToken) {
            // Check whether token is up to date
            authReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer " + authToken)
            });
        }
        // send cloned request with header to the next handler.
        return next.handle(authReq).pipe(tap(() => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                console.log(err,'--');

                if (err.status === 401) {
                    console.log("401: ", err);
                    this.router.navigateByUrl('/auth/login');
                }
            }
        }));
    }
}
