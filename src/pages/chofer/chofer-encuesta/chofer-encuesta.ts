import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetOptions } from 'ionic-angular';
//CLASE
import { Encuesta_chofer, Encuesta_texto } from '../../../classes/encuesta_chofer';
//SERVICIO
import { ChoferEncuestaProvider } from '../../../providers/chofer-encuesta/chofer-encuesta';
//CAMARA
import { Camera } from '@ionic-native/camera';
import { cameraConfig } from '../../../config/camera.config';
import { ListaViajesPage } from '../../../pages/index-paginas';
import { ThemeSettingsProvider } from '../../../providers/theme-settings/theme-settings';

@Component({
  selector: 'page-chofer-encuesta',
  templateUrl: 'chofer-encuesta.html',
})
export class ChoferEncuestaPage {

  mostrarSpinner: boolean = false;
  //ENCUESTA
  encuesta: Encuesta_chofer;
  encuesta_byDefault: any;
  encuesta_foto: string = "assets/imgs/encuesta_default.png";
  texto: any = Encuesta_texto;
  cambios: boolean;
  //VALORES
  fecha: string;
  hora: string;
  foto_preview: string;
  foto_subir: string;
  chofer: any;
  vehiculo: any;
  ionSelectOptions: ActionSheetOptions = { cssClass: 'naif-theme' };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private camera: Camera,
    private _encuestaService: ChoferEncuestaProvider,
    private colorSettings: ThemeSettingsProvider) {
    this.colorSettings.getActiveTheme().subscribe(val => this.ionSelectOptions.cssClass = val.toString());

    if (this.navParams.get('chofer') != undefined) { this.chofer = this.navParams.get('chofer') };
    if (this.navParams.get('vehiculo') != undefined) { this.vehiculo = this.navParams.get('vehiculo') };

    this.mostrarSpinner = true;
  }

  ionViewDidLoad() {

    this.generar_encuesta_byDefault();
  }

  //GENERAR ENCUESTA (by default)
  generar_encuesta_byDefault() {

    this.mostrarSpinner = true;
    this.encuesta_byDefault = {
      id_encuesta: "keyEncuesta",
      id_chofer: this.chofer != null ? this.chofer.uid : 'uid',
      id_vehiculo: this.vehiculo != null ? this.vehiculo.key : 'key',
      fecha: "N/N",
      cod_fecha: "N/N",
      hora: "N/N",
      pregunta_1: 0,
      pregunta_2: 0,
      pregunta_3: 0,
      pregunta_4: false,
      pregunta_5: "",
      foto: this.encuesta_foto
    }
    this.encuesta = new Encuesta_chofer(this.encuesta_byDefault);
    this.mostrarSpinner = false;
  }

  //GENERAR FECHA
  generar_fecha() {
    let promesa = new Promise((resolve, reject) => {
      let currentDate = new Date();
      this.fecha = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
      this.hora = currentDate.getHours().toString() + ':' + (currentDate.getMinutes() < 10 ? '0' : '').toString() + currentDate.getMinutes().toString();
      resolve();
    });
    return promesa;
  }

  //CAMBIAR FOTO
  cambiar_foto() {
    this.camera.getPicture(cameraConfig)
      .then((imageData) => {
        this.foto_preview = 'data:image/jpeg;base64,' + imageData;
        this.encuesta.foto = this.foto_preview;
        this.foto_subir = imageData;
        if (this.hay_diferencias)
          console.log("Foto cambiada...esperando para guardar");
      }, (err) => {
        console.log("Error al tomar imagen: " + err);
      });
  }

  //FUNCTION ATRIBUTO: Valida si hay cambios
  get hay_diferencias(): boolean {
    if (this.encuesta.pregunta_1 != this.encuesta_byDefault.pregunta_1 ||
      this.encuesta.pregunta_2 != this.encuesta_byDefault.pregunta_2 ||
      this.encuesta.pregunta_3 != this.encuesta_byDefault.pregunta_3 ||
      this.encuesta.pregunta_4 != this.encuesta_byDefault.pregunta_4 ||
      this.encuesta.pregunta_5 != this.encuesta_byDefault.pregunta_5 ||
      this.encuesta.foto != this.encuesta_byDefault.foto) {
      this.cambios = true;
      return true;
    }
    else {
      this.cambios = false;
      return false;
    }
  }

  guardar() {
    this.mostrarSpinner = true;
    //SE GENERA NUEVA FECHA
    this.generar_fecha().then(() => {
      this.encuesta.fecha = this.fecha;
      this.encuesta.cod_fecha = new Date().valueOf().toString();
      this.encuesta.hora = this.hora;

      console.log('Encuesta : ', this.encuesta);
      this.guardar_encuesta();

    })

  }

  //AGREGAR ENCUESTA EN DB
  guardar_encuesta() {
    if (this.hay_diferencias) {

      this._encuestaService.alta_encuesta(this.encuesta).then((key: any) => {

        this.encuesta.id_encuesta = key;

        this.guardar_nuevaFoto().then(() => {

          this._encuestaService.modificar_encuesta(this.encuesta).then(() => {

            console.log("Cambios guardados!");
            this.mostrarSpinner = false;
            this.mostrarAlerta("Cambios realizados con éxito");
            this.navCtrl.setRoot(ListaViajesPage, { vehiculo: this.vehiculo });

          })
            .catch((error) => {
              console.log("Error al actualizar datos de encuesta: " + error);
            })



        }).catch(e => console.log("Error al actualizar datos de encuesta: " + e))

      }).catch((error) => {
        this.mostrarSpinner = false;
        console.log("Error al agregar encuesta: " + error);
      })
    }
  }

  //AGREGAR FOTO EN STORAGE
  guardar_nuevaFoto() {

    let promesa = new Promise((resolve, reject) => {

      if (this.encuesta.foto != this.encuesta_byDefault.foto) {

        this._encuestaService.cargar_imagen_storage(this.encuesta.id_encuesta, this.foto_subir)
          .then((url: any) => {
            console.log("URL de foto: " + url);
            this.encuesta.foto = url.toString();
            resolve();
          })
          .catch((error) => {
            this.mostrarSpinner = false;
            console.log("Error: al subir archivo al storage - " + JSON.stringify(error));
          })
      }
      else
        resolve();

    });
    return promesa;
  }

  //ALERTA
  mostrarAlerta(msj: string) {
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  cancelar() {
    this.navCtrl.pop();
  }

}
