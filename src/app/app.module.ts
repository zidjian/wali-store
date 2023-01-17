import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Agregamos el pauqete de forms de angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SwiperModule } from "swiper/angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagenesComponent } from './componentes/imagenes/imagenes.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { NavComponent } from './componentes/nav/nav.component';

// Pipes
import { ReversaPipe } from './pipes/reversa.pipe';
import { HaceCuantoPipe } from './pipes/hace-cuanto.pipe';
import { CambioVocalesPipe } from './pipes/cambio-vocales.pipe';

// Directivas
import { ResaltadoDirective } from './directivas/resaltado.directive';

// Interceptores
import { TiempoInterceptor } from "./interceptores/tiempo.interceptor";
import { TokenInterceptor } from "./interceptores/token.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        ImagenesComponent,
        ProductoComponent,
        ProductosComponent,
        NavComponent,
        ReversaPipe,
        HaceCuantoPipe,
        CambioVocalesPipe,
        ResaltadoDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SwiperModule
    ],
    providers: [
        {
            provide:
                HTTP_INTERCEPTORS,
                useClass: TiempoInterceptor,
                multi: true
        },
        {
            provide:
                HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
