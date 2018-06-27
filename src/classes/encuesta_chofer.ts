//CLASE

export class Encuesta_chofer{

    id_encuesta?:string;//------es la key de firebase
    id_vehiculo:string;//----------se sacan datos de: cliente/chofer/vehiculo/etc.
    id_chofer:string;
    fecha:string;
    cod_fecha:string;
    hora:string;
    pregunta_1?:number;
    pregunta_2?:number;
    pregunta_3?:number;
    pregunta_4?:boolean;
    pregunta_5?:string;
    foto:string;

    constructor(encuesta_data:any){
      //AL PEDIR VIAJE
      this.id_encuesta = encuesta_data.id_encuesta;
      this.id_vehiculo    = encuesta_data.id_vehiculo;
      this.id_chofer    = encuesta_data.id_chofer;
      this.fecha       = encuesta_data.fecha;
      this.cod_fecha   = encuesta_data.cod_fecha;
      this.hora        = encuesta_data.hora;
      this.pregunta_1  = encuesta_data.pregunta_1;
      this.pregunta_2  = encuesta_data.pregunta_2;
      this.pregunta_3  = encuesta_data.pregunta_3;
      this.pregunta_4  = encuesta_data.pregunta_4;
      this.pregunta_5  = encuesta_data.pregunta_5;
      this.foto        = encuesta_data.foto;
    }

}

//TEXTO

export const Encuesta_texto = {
  perfil:'Chofer',
  titulo: 'Control de Unidad Asignada ',
  preguntas:{
    //SELECT
    p_1: {
        p:"¿Cómo calificarías el estado general?",
        op:{
          1:"Excelente",
          2:"Bueno",
          3:"Regular",
          4:"Deficiente",
          5:"Nefasto"
        }
    },
    //RANGE
    p_2: {
        p:"¿Estado de Limpieza?",
        op:{
          1:"Muy malo",
          2:"Malo",
          3:"Regular",
          4:"Bien",
          5:"Muy bien"
        }
    },
    //RADIO
    p_3: {
        p:"¿Posee raspones/choques?",
        op:{
          1:"Sí",
          2:"No",
          3:"No lo sé"
        }
    },
    //CHECKBOX
    p_4: {
      p:"¿Arranco de Una?"
    },
    //INPUT
    p_5: {
      p:"Comentarios"
    }
  }
}
