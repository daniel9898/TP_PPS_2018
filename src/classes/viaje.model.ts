import { DateTime } from "ionic-angular/umd";

export class viaje {
    id_cliente: string;
    id_chofer: string;
    id_vehiculo: string;
    fecha: DateTime;
    cod_fecha: string;
    origen: string;
    destino: string;
    distancia: number;
    precio: number;
    estado: string;
}