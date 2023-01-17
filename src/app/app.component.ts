import { Component } from '@angular/core';

// Servicios
import { UsuariosService } from "./servicios/usuarios.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private usuariosService: UsuariosService
    ) {

    }

    createUsuario() {
        this.usuariosService.create({name: 'Orlando', email: 'coop@gmail.com', password: '12345678'})
            .subscribe( respuesta => {
                console.log(respuesta);
            });
    }

}
