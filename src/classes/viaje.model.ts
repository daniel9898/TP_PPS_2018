export class Viaje {
    public id_cliente: string;
    public id_chofer: string;
    public id_vehiculo: string;
    public fecha: string;
    public cod_fecha: string;
    public origen: string;
    public destino: string;
    public distancia: number;
    public precio: number;
    public estado: string;
    public destino_coord: number[];
    public origen_coord: number[];
}

export class Reserva extends Viaje {
    public hora : Date;
}