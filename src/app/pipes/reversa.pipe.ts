import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reversa'
})
export class ReversaPipe implements PipeTransform {

    transform(value: string): string {
        return value.split('').reverse().join(''); // separa el string, luego lo invierte y finamente lo une
    }

}
