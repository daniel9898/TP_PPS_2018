import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { Viaje } from '../../../classes/viaje';
import { SupervisorListaViajesPage } from '../supervisor-lista-viajes/supervisor-lista-viajes';

/**
 * Generated class for the SupervisorAsignaViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-asigna-viaje',
  templateUrl: 'supervisor-asigna-viaje.html',
})
export class SupervisorAsignaViajePage {
  chofer:any;
  viaje:Viaje;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioSrv: UsuarioServicioProvider,
    public viajeSrv: ViajeServicio) {
      if(this.navParams.data.viaje && this.navParams.data.chofer){
        this.viaje = this.navParams.data.viaje;
        this.chofer = this.navParams.data.chofer;
        console.log(this.viaje,this.chofer);
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorAsignaViajePage');
  }

  asignarViaje(){
    this.chofer.id_viaje = this.viaje.id_viaje;
    this.usuarioSrv.modificar_usuario(this.chofer)
    .then(result => {
      console.log(result,'ok')
      this.viaje.id_chofer = this.chofer.id_chofer;
      this.viajeSrv.modificar_viaje(this.viaje)
      .then(viaje => {
        console.log(viaje,'ok');
        this.navCtrl.popTo(SupervisorListaViajesPage);
      });
    });
  }

  liberarViaje(){
    this.chofer.id_viaje = '';
    this.usuarioSrv.modificar_usuario(this.chofer)
    .then(result => {
      console.log(result,'ok')
      this.viaje.id_chofer = '';
      this.viajeSrv.modificar_viaje(this.viaje)
      .then(viaje => {
        console.log(viaje,'ok');
        this.navCtrl.popTo(SupervisorListaViajesPage);
      });
    });
  }

}
