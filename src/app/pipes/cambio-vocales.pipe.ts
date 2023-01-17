import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cambioVocales'
})
export class CambioVocalesPipe implements PipeTransform {
    cambio: string[][] = [
        [ 'e', '3' ],
        [ 'o', '0' ],
        [ 'i', '1' ],
        [ 'a', '5' ],
        [ 'u', '7' ],
        [ 'E', '3' ],
        [ 'O', '0' ],
        [ 'I', '1' ],
        [ 'A', '5' ],
        [ 'U', '7' ],
    ];
    transform( valor: string ): string {
        this.cambio.map( ( elemento ) => {
            valor = valor.replaceAll( elemento[0], elemento[1] );
        } );
        return valor;
    }

}
