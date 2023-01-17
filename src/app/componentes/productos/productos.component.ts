import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import Swal from 'sweetalert2'

// ---- Modelos
import { Producto, CrearProductoDTO, UpdateAllProductoDTO } from "./../../modelos/producto.model"; // Importamos el modelo que debe seguir cada producto

// ---- Servicios
import { TiendaService } from "./../../servicios/tienda.service";
import { ProductosService } from "./../../servicios/productos.service";

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

    carrito_compras: Producto[] = [];
    total = 0;
    fecha = new Date(1995, 2, 28);
    mostrar_producto = false;
    limit = 10;
    offset = 0;
    estado_producto: 'cargando' | 'exitoso' | 'error' | 'init' = 'init';

    productos: Producto[] = [];
    producto_elegido: Producto = {
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
    }

    // Inicio: swiper

    config: SwiperOptions = {
        slidesPerView: 1,
        navigation: true,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
    };

    // Fin: swiper

    constructor(
        private tiendaService: TiendaService,
        private productosService: ProductosService
    ) {
        this.carrito_compras = this.tiendaService.getCarrito();
    }

    ngOnInit(): void {
        this.productosService.getAll(this.limit, this.offset)
            .subscribe((data) => {
                this.productos = data;
                this.offset += this.limit;
            });
    }

    agregarCarrito(producto: Producto) {
        this.tiendaService.addProducto(producto);
        this.total = this.tiendaService.getTotal();
    }

    toggleProduct() {
        this.mostrar_producto = !this.mostrar_producto;
    }

    showProduct(id: number) {
        this.estado_producto = 'cargando';
        this.productosService.getProducto(id)
            .subscribe((data) => {
                this.estado_producto = 'exitoso';
                this.toggleProduct();
                this.producto_elegido = data;
            }, respuesta => {
                this.estado_producto = 'error';
                Swal.fire({
                    position: 'top-end',
                    timer: 2000,
                    text: respuesta,
                    showConfirmButton: false
                })
            });
    }

    crearProducto() {
        const mi_producto: CrearProductoDTO = {
            title: 'Monitor Asus Pro Art',
            price: 1200,
            description: 'Para uso profesional',
            categoryId: 1,
            images: [
                'https://source.unsplash.com/random/?Monitor PC/',
                'https://source.unsplash.com/random/?Monitors PC/',
                'https://source.unsplash.com/random/?Monitor PC Gamer/'
            ]
        };
        this.productosService.create(mi_producto)
            .subscribe((data) => {
                this.productos.unshift(data);
            });
    }

    actualizarProducto() {
        const update_mi_producto: UpdateAllProductoDTO = {
            title: 'Hola'
        }
        this.productosService.updateAll(update_mi_producto, 1)
            .subscribe((data) => {
                // Ubicamos el indice donde el ID del elemento sea igual al ID del producto elegido
                const indice = this.productos.findIndex(elemento => elemento.id == this.producto_elegido.id);
                this.productos[indice] = data;
                this.producto_elegido = data;
            });
    }

    eliminarProducto() {
        this.productosService.delete(this.producto_elegido.id)
            .subscribe(() => {
                console.log('Elemento eliminado');
                this.toggleProduct();
                const indice = this.productos.findIndex(elemento => elemento.id == this.producto_elegido.id);
                this.productos.splice(indice, 1);
            });
    }

    cargarMas() {
        this.productosService.getMas(this.limit, this.offset)
            .subscribe((data) => {
                this.productos = this.productos.concat(data);
                this.offset += this.limit;
            });
    }
}
