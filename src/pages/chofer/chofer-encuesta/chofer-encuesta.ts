import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//CLASE
import { Encuesta_chofer } from '../../../classes/encuesta_chofer';
//SERVICIO
import { ChoferEncuestaProvider } from '../../../providers/chofer-encuesta/chofer-encuesta';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { IdiomaProvider } from '../../../providers/idioma/idioma';
//CAMARA
import { Camera } from '@ionic-native/camera';
import { cameraConfig } from '../../../config/camera.config';
import { ListaViajesPage } from '../../../pages/index-paginas';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@Component({
  selector: 'page-chofer-encuesta',
  templateUrl: 'chofer-encuesta.html',
})
export class ChoferEncuestaPage {

  mostrarSpinner:boolean = false;
  //ENCUESTA
  encuestasDelChofer:Encuesta_chofer[] = [];
  encuesta:Encuesta_chofer;
  encuesta_byDefault:any;
  encuesta_foto:string = "assets/imgs/encuesta_default.png";
  cambios:boolean;
  //VALORES
  fecha:string;
  hora:string;
  foto_preview:string;
  foto_subir:string;
  id_chofer : any;
  id_vehiculo : any;
  desdeInicio:boolean = false;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private camera: Camera,
              private _encuestaService:ChoferEncuestaProvider,
              private _utilitiesServ:UtilidadesProvider,
              private _idiomaSrv: IdiomaProvider) {
    //IDIOMA
    this.idioma = Idioma.es;
    this.mostrarSpinner = true;
    if(this.navParams.get('chofer') != undefined){ this.id_chofer = this.navParams.get('chofer')};
    if(this.navParams.get('vehiculo') != undefined){ this.id_vehiculo = this.navParams.get('vehiculo')};
    if(this.navParams.get('desdeInicio') != undefined){ this.desdeInicio = this.navParams.get('desdeInicio')};

  }

  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }
  //CARGAR IDIOMA
  cargar_idioma(){
  this._idiomaSrv.getLanguageFromStorage()
    .then((idioma)=>{
      this.idioma = idioma;
    })
  }

  ionViewDidLoad() {
    //GENERAR FECHA DEL DIA
    this.generar_fecha()
      .then(()=>{
   //TRAER ENCUESTA DEL DIA
        this.traer_encuesta_del_dia()
   //GENERAR ENCUESTA by DEFAULT
          .then(()=>{
            this.generar_encuesta_byDefault();
        })
      })
  }

  //TRAER ENCUESTA DEL DIA
  traer_encuesta_del_dia(){
    let promesa = new Promise((resolve, reject)=>{
      this.encuestasDelChofer = [];
      this._encuestaService.traer_encuestas(this.fecha, "fecha")
        .then((encuestas:any)=>{
          for(let enc of encuestas){
            if(enc.id_chofer == this.id_chofer){
              this.encuestasDelChofer.push(enc);
            }
          }
          console.log("Encuestas!: " + JSON.stringify(this.encuestasDelChofer[0]));
          resolve();
        })
        .catch((error)=>{ console.log("Error al traer encuestas: " + error); resolve() })
    });
    return promesa;
  }

  //GENERAR ENCUESTA (by default)
  generar_encuesta_byDefault(){

    this.mostrarSpinner = true;
    if(this.encuestasDelChofer[0] != null){
      this.encuesta_byDefault = this.encuestasDelChofer[0];
    }
    else{
      this.encuesta_byDefault = {
        id_encuesta: "keyEncuesta",
        id_chofer: this.id_chofer,
        id_vehiculo: this.id_vehiculo,
        fecha:"N/N",
        cod_fecha: "N/N",
        hora:"N/N",
        pregunta_1:0,
        pregunta_2:0,
        pregunta_3:0,
        pregunta_4:false,
        pregunta_5:"",
        foto: this.encuesta_foto
      }
    }
    this.encuesta = new Encuesta_chofer(this.encuesta_byDefault);
    this.mostrarSpinner = false;
  }

  //GENERAR FECHA
  generar_fecha(){
    let promesa = new Promise((resolve, reject)=>{
      let currentDate = new Date();
      this.fecha = currentDate.getFullYear()+'-'+(currentDate.getMonth()<10?'0':'').toString()+(currentDate.getMonth() + 1)+'-'+(currentDate.getDate()<10?'0':'').toString()+currentDate.getDate();
      console.log("Fecha actual: " + this.fecha);
      this.hora = (currentDate.getHours()<10?'0':'').toString() + currentDate.getHours().toString()+':'+ (currentDate.getMinutes()<10?'0':'').toString() +currentDate.getMinutes().toString();
      resolve();
    });
    return promesa;
  }

  //CAMBIAR FOTO
  cambiar_foto(){
    this.camera.getPicture(cameraConfig)
    .then((imageData) => {
      this.foto_preview = 'data:image/jpeg;base64,' + imageData;
      this.encuesta.foto = this.foto_preview;
      this.foto_subir = imageData;
      if(this.hay_diferencias)
        console.log("Foto cambiada...esperando para guardar");
    }, (err) => {
      console.log("Error al tomar imagen: " + err);
    });
  }

  //FUNCTION ATRIBUTO: Valida si hay cambios
  get hay_diferencias():boolean{
    if(this.encuesta.pregunta_1 != this.encuesta_byDefault.pregunta_1    ||
       this.encuesta.pregunta_2 != this.encuesta_byDefault.pregunta_2    ||
       this.encuesta.pregunta_3 != this.encuesta_byDefault.pregunta_3    ||
       this.encuesta.pregunta_4 != this.encuesta_byDefault.pregunta_4    ||
       this.encuesta.pregunta_5 != this.encuesta_byDefault.pregunta_5    ||
       this.encuesta.foto       != this.encuesta_byDefault.foto ){
         this.cambios = true;
         return true;
    }
    else{
      this.cambios = false;
      return false;
    }
  }

  guardar(){
    this.mostrarSpinner = true;
    //SE GENERA NUEVA FECHA
    this.generar_fecha().then(()=>{
      this.encuesta.fecha = this.fecha;
      this.encuesta.cod_fecha = new Date().valueOf().toString();
      this.encuesta.hora = this.hora;
      //console.log('Encuesta : ',this.encuesta);
      this.guardar_encuesta();

    })

  }

  //AGREGAR ENCUESTA EN DB
  guardar_encuesta(){
    if(this.hay_diferencias){

      //SI YA EXISTE UNA ENCUESTA DE CHOFER EN EL DIA
      if(this.encuestasDelChofer != [] && this.encuestasDelChofer[0] !== undefined){
      this.guardar_nuevaFoto().then(()=>{

          this._encuestaService.modificar_encuesta(this.encuesta).then(()=>{

               console.log("Cambios guardados encuesta existente!");
             this.mostrarSpinner = false;
             this._utilitiesServ.showToast(this.idioma.pag_encuesta_chofer.mensaje);
             if(this.desdeInicio)
               this.navCtrl.setRoot(ListaViajesPage);
            else
                this.navCtrl.pop();

          }).catch((error)=>{ console.log("Error al actualizar datos de encuesta: " + error); })
        }).catch(e => console.log("Error al guardar foto en encuesta: " + e))
      }
      //SI ES LA PRIMER ENCUESTA DEL DIA
      else{
          this._encuestaService.alta_encuesta(this.encuesta).then((key:any)=>{

          this.encuesta.id_encuesta = key;
          this.guardar_nuevaFoto().then(()=>{

              this._encuestaService.modificar_encuesta(this.encuesta).then(()=>{

                   console.log("Cambios guardados primera encuesta!");
                 this.mostrarSpinner = false;
                 this._utilitiesServ.showToast(this.idioma.pag_encuesta_chofer.mensaje);
                 if(this.desdeInicio)
                   this.navCtrl.setRoot(ListaViajesPage);
                else
                    this.navCtrl.pop();

              }).catch((error)=>{ console.log("Error al actualizar datos de encuesta: " + error); })
            }).catch(e => console.log("Error al guardar foto en encuesta: " + e))
          }).catch((error)=>{
            this.mostrarSpinner = false;
            console.log("Error al agregar encuesta: " + error);
          })
      }

    }
  }

    //AGREGAR FOTO EN STORAGE
  guardar_nuevaFoto(){

      let promesa = new Promise((resolve, reject)=>{

        if(this.encuesta.foto != this.encuesta_byDefault.foto){

          this._encuestaService.cargar_imagen_storage(this.encuesta.id_encuesta, this.foto_subir)
            .then((url:any) => {
                console.log("URL de foto: " + url);
                this.encuesta.foto = url.toString();
                resolve();
            })
            .catch((error)=>{
              this.mostrarSpinner = false;
              console.log("Error: al subir archivo al storage - " + JSON.stringify(error));
            })
        }
        else
          resolve();

      });
      return promesa;
  }

  cancelar(){
    //SI accede a la encuesta desde el inicio chofer (la puede completar en otro momento)
    if(this.desdeInicio)
      this.navCtrl.setRoot(ListaViajesPage);
    //SI accede a la encuesta desde lista viajes o viaje chofer
    else
      this.navCtrl.pop();
  }

}
