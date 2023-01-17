import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-imagenes',
    templateUrl: './imagenes.component.html',
    styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent {

    imagen = ''; // Se crea una varaible imagen
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input("imagen") // Mascara para el dato que sera recibido del padre
    set cambioImagen( nueva_imagen: string ) {
        this.imagen = nueva_imagen; // Se asigna el valor de la imagen recibida del padre a la variable imagen
    }

    imagen_por_defecto = './assets/images/default.png';

    errorImagen() {
        this.imagen = this.imagen_por_defecto;
    }
}
