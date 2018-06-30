import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../../classes/usuario';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { Viaje } from '../../../classes/viaje.model';
import { SupervisorAsignaViajePage } from '../supervisor-asigna-viaje/supervisor-asigna-viaje';

/**
 * Generated class for the SupervisorChoferesDisponiblesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-choferes-disponibles',
  templateUrl: 'supervisor-choferes-disponibles.html',
})
export class SupervisorChoferesDisponiblesPage {

  mostrarSpinner: boolean = false;
  usuarios: Usuario[] = [];
  viaje: Viaje

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuarioServicio: UsuarioServicioProvider) {
    if (this.navParams.data.viaje !== null) {
      this.viaje = this.navParams.data.viaje;
      console.log(this.viaje);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorChoferesDisponiblesPage');
    this._usuarioServicio.getUsers().subscribe(next => {
      this.usuarios = next.filter(usr => usr.perfil == 'chofer' && usr.id_vehiculo && usr.id_vehiculo.length > 0 && usr.activo && !usr.viajando);
      console.log(next);
    });
  }

/**
 * ir a pantalla de asignación de viaje
 */
  asignarViaje(index) {
    const chofer = this.usuarios[index];
    this.navCtrl.push(SupervisorAsignaViajePage,{ viaje: this.viaje, chofer: chofer });
  }

}
