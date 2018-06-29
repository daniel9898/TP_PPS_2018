//CLASE

export class Encuesta_cliente{

    id_encuesta?:string;//------es la key de firebase
    id_viaje:string;//----------se sacan datos de: cliente/chofer/vehiculo/etc.
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
      this.id_viaje    = encuesta_data.id_viaje;
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
  perfil:'Cliente',
  titulo: 'Encuesta de satisfacción',
  preguntas:{
    //SELECT
    p_1: {
        p:"¿Cómo calificarías el servicio?",
        op:{
          1:"Excelente",
          2:"Eficiente",
          3:"Regular",
          4:"Deficiente",
          5:"Nefasto"
        }
    },
    //RANGE
    p_2: {
        p:"¿Qué tal ha sido la atención del chofer?",
        op:{
          1:"Muy mala",
          2:"Mala",
          3:"Regular",
          4:"Bien",
          5:"Muy bien"
        }
    },
    //RADIO
    p_3: {
        p:"¿El vehículo estaba en condiciones?",
        op:{
          1:"Sí",
          2:"No",
          3:"No lo sé"
        }
    },
    //CHECKBOX
    p_4: {
      p:"¿Se ha respetado la ruta marcada?",
    },
    //INPUT
    p_5: {
      p:"Comentarios"
    }
  }
}
