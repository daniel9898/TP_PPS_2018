import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { cameraConfig } from '../../../config/camera.config';
import { VehiculoImagenProvider } from '../../../providers/vehiculo-imagen/vehiculo-imagen';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { vehiculo } from '../../../classes/vehiculo.model';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';
import { IdiomaProvider } from '../../../providers/idioma/idioma';

@IonicPage()
@Component({
  selector: 'page-photo-taker',
  templateUrl: 'photo-taker.html',
})
export class PhotoTakerPage implements OnInit {

  key: string = '';
  vehiculo: vehiculo;
  public base64Image: string;
  public photos: string[];
  //TEXTO
  idioma:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private vehiculoImagenSrv: VehiculoImagenProvider,
    private vehiculoSrv: VehiculosProvider,
    private utilidadesSrv: UtilidadesProvider,
    private _idiomaSrv: IdiomaProvider
  ) {
    //IDIOMA
    this.idioma = Idioma.es;
    this.vehiculo = this.navParams.data;
    console.log(this.navParams.data);
    this.photos = [];
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

  ngOnInit(): void {
    if (this.navParams.data.vehiculo) {
      this.vehiculo = this.navParams.data.vehiculo;
      this.key = this.navParams.data.key;
    }
    this.camera.getPicture(cameraConfig).then((imageData) => {
      this.photos.push(`data:image/jpeg;base64,${imageData}`);
      // this.vehiculoImagenSrv.subirImagenVehiculo('test', imageData)
      //   .then(result => this.photos.push(result))
      //   .catch(error => alert(error));
      // let image = new ImageModel();
      // image.displayName = this.user.displayName;
      // image.image64Data = this.base64Image;

      // this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('PhotoTakerPage página cargada');
  }

  /**
   * Del botón nueva foto
   */
  takePhoto() {
    this.camera.getPicture(cameraConfig).then((imageData) => {
      this.photos.push("data:image/jpeg;base64," + imageData);
    }, (err) => {
      console.log(err);
    });
  }


  /**
   * Para borrar una imagen desde el for del html
   * @param index El indice de la foto
   */
  deletePhoto(index) {
    this.photos.splice(index, 1);
    this.utilidadesSrv.showToast(this.idioma.pag_photoTaker_supervisor.mensaje.msj_2);
  }

  /**
   * Subir fotos
   */
  public uploadPhotos() {
    this.vehiculo.fotos = [];
    for (let index = 0; index < this.photos.length; index++) {
      const element = this.photos[index];
      this.vehiculoImagenSrv.subirImagenVehiculo(this.key,element).then(result => {
        this.vehiculo.fotos.push(result);
      }).catch(error => console.log(error));

    }
    this.vehiculoSrv.updateItem(this.key,this.vehiculo);
    this.utilidadesSrv.showToast(this.idioma.pag_photoTaker_supervisor.mensaje.msj_1);
    this.navCtrl.pop();
  }

}
