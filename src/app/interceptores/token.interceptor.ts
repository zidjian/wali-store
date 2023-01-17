import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from "./../servicios/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request = this.addToken(request);
        return next.handle(request);
    }

    addToken( request: HttpRequest<unknown> ) {
        const token = this.tokenService.getToken();
        if(token) {
            const consulta = request.clone( {
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            } );
            return consulta;
        }
        return request;
    }
}
