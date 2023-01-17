import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpContext,
    HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

const VERIFICAR_TIEMPO = new HttpContextToken<boolean>(() => false);

export function verificarTiempo() {
    return new HttpContext().set(VERIFICAR_TIEMPO, true);
}

@Injectable()
export class TiempoInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if(request.context.get(VERIFICAR_TIEMPO)) {
            const inicio = performance.now(); // Inicializamos una constante con el inicio del tiempo
            return next
                .handle(request)
                .pipe(
                    tap( () => {
                        const tiempo = ( performance.now() - inicio) + 'ms'; // Le restamos al tiempo actual el tiempo en el cual inicio y le concatenamos 'ms'
                        console.log(tiempo);
                    })
                );
        }
        return next.handle(request);
    }
}
