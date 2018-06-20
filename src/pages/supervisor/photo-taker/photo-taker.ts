import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { cameraConfig } from '../../../config/camera.config';
import { VehiculoImagenProvider } from '../../../providers/vehiculo-imagen/vehiculo-imagen';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { vehiculo } from '../../../classes/vehiculo.model';
// import { ImageModel } from '../../models/imageModel';
// import { User } from '@firebase/auth-types';
// import { ImageDbProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the PhotoTakerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private alertCtrl: AlertController,
    private vehiculoImagenSrv: VehiculoImagenProvider,
    private vehiculoSrv: VehiculosProvider
  ) {
    this.vehiculo = this.navParams.data;
    console.log(this.navParams.data);
    this.photos = [];
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
    console.log('ionViewDidLoad PhotoTakerPage');
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
    let confirm = this.alertCtrl.create({
      title: '¿Está seguro que quiere elminar la imagen?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
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
    this.navCtrl.pop();
  }

}
