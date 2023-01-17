// Importamos ElementRef para poder hacer referencia al elemento
// Importamos HostListener para escuchar los evento en el elemento
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appResaltado]'
})
export class ResaltadoDirective {

    @HostListener('mouseenter') onMouseEnter() {
        this.elemento.nativeElement.style.backgroundColor = 'yellow';
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.elemento.nativeElement.style.backgroundColor = '';
    }

    constructor(
        private elemento: ElementRef
    ) { }

}
