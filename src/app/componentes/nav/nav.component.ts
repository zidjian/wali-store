import { Component, OnInit } from '@angular/core';

// Servicios
import { TiendaService } from "./../../servicios/tienda.service"; // Importamos el servicio
import { AuthService } from "./../../servicios/auth.service";
import { Usuario } from 'src/app/modelos/usuario.model';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    menu_activo = false;
    cantidad = 0; // Inicializamos el varaible contidada con 0
    perfil: Usuario | null = null;

    constructor(
        private tiendaService: TiendaService, // Inyectamos el servico importado
        private authService: AuthService
    ) {

    }

    ngOnInit() {
        // Escuchamos los cambios de la varibale mi_carrito$ con .susbcribe(). Además, le asignamos el tamaño del array productos a la variable cantidad
        this.tiendaService.mi_carrito$
            .subscribe( productos => {
                this.cantidad = productos.length;
            } );
    }

    activarMenu(): void {
        this.menu_activo = !this.menu_activo;
    }

    login() {
        this.authService.loginPerfil('coop@gmail.com', '12345678')
            .subscribe( respuesta => {
                console.log(respuesta);
                this.perfil = respuesta;
            });
    }
}
