//CLASE

export class Viaje{

    id_viaje:string;//------es la key de firebase
    id_cliente:string;
    id_chofer:string; //---se define al tomar viaje chofer
    id_vehiculo?:string; //-se define al tomar viaje chofer
    fecha:string;
    cod_fecha:string;
    hora:string;
    origen:string;
    origen_coord:number[];
    destino:string;
    destino_coord:number[];
    distancia:number;
    precio:number;
    estado:string;
    // POSIBLES ESTADOS: cancelado / cumplido / pendiente / tomado / en curso


    constructor(viaje_data:any){
      //AL PEDIR VIAJE
      this.id_viaje = viaje_data.id_viaje;
      this.id_cliente = viaje_data.id_cliente;
      this.fecha = viaje_data.fecha;
      this.cod_fecha = viaje_data.cod_fecha;
      this.hora = viaje_data.hora;
      this.origen = viaje_data.origen;
      this.origen_coord = viaje_data.origen_coord;
      this.destino = viaje_data.destino;
      this.destino_coord = viaje_data.destino_coord;
      this.distancia = viaje_data.distancia;
      this.precio = viaje_data.precio;
      this.estado = viaje_data.estado; //valor que varía.
      //AL TOMAR VIAJE
      this.id_chofer = viaje_data.id_chofer;
      this.id_vehiculo = viaje_data.id_vehiculo;
    }

}

//TEXTO

export const Viaje_texto = {

  label:{
    origen: "Origen",
    destino: "Destino",
    distancia: "Distancia",
    precio: "Precio",
    hora: "Hora",
    button_ok: "Listo",
    button_cancel: "Cancelar"
  },
  msj_final:{
    titulo: "FIN DEL RECORRIDO",
    subtitulo: "¡Gracias por elegirnos!",
    texto_1: "¿Estás conforme?",
    texto_2: "Ingresa en la encuesta y danos tu opinión"
  },
  chofer:{
    titulo: "DATOS DEL CHOFER",
    nombre: "Nombre:",
    patente:"Patente:"
  },
  estados:{
    titulo: "ESTADO",
    pendiente: "Buscando chofer",
    tomado: "Chofer asignado - aguarde llegada",
    en_curso: "Viaje iniciado",
    cumplido:"Viaje finalizado",
    cancelado_cliente: "Viaje cancelado",
    cancelado_sistema: "Viaje cancelado por sistema"
  }

}
