import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from "date-fns"; // Importamos el metodo formatDistance de la libreria date-fns

@Pipe({
    name: 'haceCuanto'
})
export class HaceCuantoPipe implements PipeTransform {

    transform( fecha: Date ): string { // Recibimos el parametro fecha y devolvemos un string
        return formatDistance( new Date(), fecha ); // usamos el metodo formatDistance() y le pasamos la fecha actual y la fecha a calcular
    }

}
