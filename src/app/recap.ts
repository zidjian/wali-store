// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nombre = 'Waldir'; // creamos una constante de tipo string

const sumar = ( a: number, b: number ) => { // Creamos un arrow function
    return a + b;
}

sumar( 12, 14 );

// ---- Inicializacion larga de parametros en una clase

// class Persona {
//     nombre: string;
//     edad: number;
//     constructor( nombre: string, edad: number ) {
//         this.nombre = nombre;
//         this.edad = edad;
//     }
// }

// ---- Inicializacion corta de los parametros directamente en el constructor

class Persona {
    constructor(
        public nombre: string,
        public edad:number
    ) {

    }
}

const waldir = new Persona( 'Waldir', 15 ); // Creamosn una instancia de clase Persona en la constante waldir pasandole los pametros requeridos por la clase nombre y edad
waldir.nombre; // Accedemos al paametro publico de la instancia
