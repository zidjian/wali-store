import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

// Environments
import { environment } from "./../../environments/environment";

// Modelo
import { Usuario, CrearUsuarioDTO } from "./../modelos/usuario.model";


@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    private urlApi = `${environment.API_URL}api/users`;

    constructor(
        private http: HttpClient
    ) { }

    create( dto: CrearUsuarioDTO ) {
        return this.http.post<Usuario>(`${this.urlApi}`, dto);
    }

    getAll() {
        return this.http.get<Usuario[]>(`${this.urlApi}`);
    }
}
