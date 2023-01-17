import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { switchMap, tap } from "rxjs/operators";

// Modelos
import { Auth } from "./../modelos/token.model";
import { Usuario } from '../modelos/usuario.model';

// Servicios
import { TokenService } from "./token.service";

// Environments
import { environment } from "./../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private urlApi = `${environment.API_URL}api/auth`;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    login(email: string, password: string) {
        return this.http.post<Auth>(`${this.urlApi}/login`, {email, password})
            .pipe(
                tap( respuesta => this.tokenService.saveToken( respuesta.access_token) )
            );
    }

    perfil() {
        return this.http.get<Usuario>(`${this.urlApi}/profile`);
    }

    loginPerfil(email: string, password: string) {
        return this.login(email, password)
            .pipe(
                switchMap( () => this.perfil() )
            )
    }
}
