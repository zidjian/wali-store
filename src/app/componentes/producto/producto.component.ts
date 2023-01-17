import { Component, Input, Output, EventEmitter } from '@angular/core';

// ---- Modelos
import { Producto } from "../../modelos/producto.model";

@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html',
    styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
    @Input() producto: Producto = {
        id: 0,
        title: '',
        price: 0,
        description: '',
        category: {
            id: 0,
            name: '',
            typeImg: ''
        },
        images: []
    };

    @Output() producto_aniadido = new EventEmitter<Producto>();

    @Output() mostrar_producto = new EventEmitter<number>();

    aniadirCarrito( mi_producto: Producto ): void {
        this.producto_aniadido.emit( mi_producto );
    }

    mostrarProducto( mi_producto: Producto ) {
        this.mostrar_producto.emit( mi_producto.id );
    }
}
