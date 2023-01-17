import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

// Environments
import { environment } from "./../../environments/environment";

// Modelo
import { Producto, CrearProductoDTO, UpdateAllProductoDTO } from "./../modelos/producto.model";

// ---- Interceptores
import { verificarTiempo } from "./../interceptores/tiempo.interceptor";

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    private urlApi = `${environment.API_URL}api/products`;

    constructor(
        private http: HttpClient
    ) { }

    getAll(limit?: number, offset?: number) {
        // Obligatoriamente se debe enviar params para enviarlo al API
        let params = new HttpParams();
        if (limit != undefined && offset != undefined) {
            params = params.set('limit', limit);
            params = params.set('offset', offset);
        }
        return this.http.get<Producto[]>(`${this.urlApi}`, { params, context: verificarTiempo() })
            .pipe(
                map( products => products.map( elemento => {
                return {
                    ...elemento,
                    IGV: .18 * elemento.price
                }
            } ) )
        );
    }

    getProducto(id: number) {
        return this.http.get<Producto>(`${this.urlApi}/${id}`)
            .pipe(
                catchError( ( respuesta: HttpErrorResponse ) => {
                    if( respuesta.status == HttpStatusCode.InternalServerError ) {
                        return throwError("Algo falló en el servidor");
                    }
                    if( respuesta.status == HttpStatusCode.NotFound ) {
                        return throwError("El producto no existe");
                    }
                    if( respuesta.status == HttpStatusCode.Unauthorized ) {
                        return throwError("No autorizado");
                    }
                    return throwError("Algo salio mal");
                } )
            );
    }

    getMas(limit: number, offset: number) {
        let params = new HttpParams();
        params = params.set('limit', limit);
        params = params.set('offset', offset);
        return this.http.get<Producto>(`${this.urlApi}`, { params });
    }

    create(producto: CrearProductoDTO) { // Recibimos los datos con una interfaz diferete a la cual recibiremos
        return this.http.post<Producto>(`${this.urlApi}`, producto); // Enviamos con el método post enviamos los datos (urlApi, datos) para que los datos sean guardados.
    }

    updateAll(producto: UpdateAllProductoDTO, id: number) { // Recibimos los datos con una interfaz diferete a la cual recibiremos
        return this.http.put<Producto>(`${this.urlApi}/${id}/`, producto); // Enviamos con el método put enviamos los datos (urlApi, datos) para que los datos sean actualizados.
    }

    delete(id: number) {
        return this.http.delete(`${this.urlApi}/${id}/`); // Eliminamos con el método DELETE enviamos los datos (urlApi + ID) para que los datos sean eliminados segun el ID
    }
}
