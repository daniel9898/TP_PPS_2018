import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
//import { Subscription } from 'rxjs/Subscription';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-chofer-viaje',
  templateUrl: 'chofer-viaje.html',
})
export class ChoferViajePage {

 
  viaje: any;
  usuarioSesion:any;
 
  constructor(
    public navParams: NavParams,
    public userProv: UsuarioServicioProvider,
    public viajesProv: ViajeServicio,
    public utils: UtilidadesProvider,
    public modalCtrl: ModalController) {

    //this.chofer = this.navParams.get('chofer');
    this.usuarioSesion = firebase.auth().currentUser;
    this.viaje = this.navParams.get('viaje');   //viaje -LGNnCKZSawBdzJANxpq
    console.log('viaje : ',this.viaje);

  }

  async modificarEstado(estado: string) {
    this.viaje.estado = estado;
    await this.viajesProv.modificar_viaje(this.viaje);
    console.log('viaje ', this.viaje);

    if (estado != 'cumplido') {
        this.utils.showToast('Viaje en Estado : ' + estado);
    } else {
 
      this.showModal();
    }
  }

  showModal() {
    let contactModal = this.modalCtrl.create('ModalPage', { viaje: this.viaje });
    contactModal.present();
  }

  ionViewWillLeave(){
    console.log("se ejecuto ionViewWillLeave");
    //this.vehiculosSubs.unsubscribe();
   
  
  }


}
