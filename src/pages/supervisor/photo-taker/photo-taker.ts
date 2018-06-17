import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { cameraConfig } from '../../../config/camera.config';
import { VehiculoImagenProvider } from '../../../providers/vehiculo-imagen/vehiculo-imagen';
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

  vehiculo: any;
  public base64Image: string;
  public photos: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private alertCtrl: AlertController,
    private vehiculoImagenSrv: VehiculoImagenProvider
  ) {
    this.vehiculo = this.navParams.data;
    this.photos = [];
  }

  ngOnInit(): void {
    this.camera.getPicture(cameraConfig).then((imageData) => {
      this.photos.push("data:image/jpeg;base64," + imageData);
      this.vehiculoImagenSrv.subirImagenVehiculo('test', imageData)
        .then(result => this.photos.push(result))
        .catch(error => alert(error));
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

  takePhoto() {
    this.camera.getPicture(cameraConfig).then((imageData) => {
      this.photos.push("data:image/jpeg;base64," + imageData);
    }, (err) => {
      console.log(err);
    });
  }


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

  public uploadPhotos() {

  }



}
