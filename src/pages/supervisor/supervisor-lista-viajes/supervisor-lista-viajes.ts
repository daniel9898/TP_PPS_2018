import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';

/**
 * Generated class for the SupervisorListaViajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-lista-viajes',
  templateUrl: 'supervisor-lista-viajes.html',
})
export class SupervisorListaViajesPage {

  viajes: Array<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viajeSrv:ViajeServicio) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorListaViajesPage');
    this.viajeSrv.getAllTrips().subscribe(next => {
      this.viajes = next.filter(viaje => viaje.estado === 'pendiente');
    });
  }

}
