import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private securityService: SecurityService, private router: Router, private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400) {
                this.toastr.error(
                    'Ha ocurrido un error 400'
                );
                this.securityService.logout();
                this.router.navigate(['/auth/login']);
                this.toastr.info(
                    'Vuelva a autenticarse, por favor'
                );
            }

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.toastr.error(
                    'No tienes autorización 401'
                );
                this.securityService.logout();
                this.router.navigate(['/auth/login']);
            }

            if (err.status === 403) {
                this.toastr.error(
                    'No tienes autorización 403 '
                );
                this.securityService.logout();
                this.router.navigate(['/auth/login']);
            }

            if (err.status === 500) {
                this.toastr.error(
                    'Ha ocurrido un error en el servidor '
                )
                this.securityService.logout();
                this.router.navigate(['/auth/login']);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
