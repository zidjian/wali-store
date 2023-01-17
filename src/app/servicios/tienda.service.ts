import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"; // Importamos BehaviorSubject de rxjs

import { Producto } from './../modelos/producto.model';

@Injectable({
    providedIn: 'root'
})
export class TiendaService {

    // Los atributos deberian ser privados para que no puedan acceder a ellos
    private carrito_compras: Producto[] = [];
    private mi_carrito = new BehaviorSubject<Producto[]>([]); // Creamos un objeto de la instancia de la clase BehaviorSubject()

    mi_carrito$ = this.mi_carrito.asObservable(); // El observable que escuchara activamente cambios de la variable mi_carrito

    addProducto( producto: Producto ) {
        this.carrito_compras.push( producto );
        this.mi_carrito.next( this.carrito_compras ); // Transmitimos el valor de la variable carrito_compras cuadno llamen al metodo addProducto
    }

    getCarrito() {
        return this.carrito_compras;
    }

    getTotal() {
        return this.carrito_compras.reduce( ( suma, elemento ) => suma + elemento.price, 0 );
    }

}
