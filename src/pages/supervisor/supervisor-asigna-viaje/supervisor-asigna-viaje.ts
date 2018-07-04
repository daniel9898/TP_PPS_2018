import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { Viaje } from '../../../classes/viaje';
import { SupervisorListaViajesPage } from '../supervisor-lista-viajes/supervisor-lista-viajes';
import { Usuario } from '../../../classes/usuario';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { Reserva } from '../../../classes/viaje.model';

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
  chofer: Usuario;
  viaje: Viaje;
  reserva: Reserva
  esReserva: boolean = false;
  key: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioSrv: UsuarioServicioProvider,
    public viajeSrv: ViajeServicio,
    private reservaSrv: ReservasProvider) {
    if (!this.navParams.data.esReserva) {
      if (this.navParams.data.viaje && this.navParams.data.chofer) {
        this.viaje = this.navParams.data.viaje;
        this.chofer = this.navParams.data.chofer;
        this.esReserva = this.navParams.data.esReserva;
        console.log(this.viaje, this.chofer);
      }
    } else if (this.navParams.data.esReserva) {
      this.reserva = this.navParams.data.viaje.reserva;
      this.key = this.navParams.data.viaje.key;
      this.esReserva = this.navParams.data.esReserva;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorAsignaViajePage');
  }

  public asignarViaje() {
    this.chofer.id_viaje = this.viaje.id_viaje;
    this.usuarioSrv.modificar_usuario(this.chofer)
      .then(result => {
        console.log(result, 'ok')
        this.viaje.id_chofer = this.chofer.key;
        if (!this.esReserva) {
          this.viajeSrv.modificar_viaje(this.viaje)
            .then(viaje => {
              console.log(viaje, 'ok');
              this.navCtrl.popTo(SupervisorListaViajesPage);
            });
        } else if (this.esReserva) {
          this.reservaSrv.updateItem(this.key,this.reserva);
        }

      });
  }

  liberarViaje() {
    this.chofer.id_viaje = '';
    this.usuarioSrv.modificar_usuario(this.chofer)
      .then(result => {
        console.log(result, 'ok')
        this.viaje.id_chofer = '';
        this.viajeSrv.modificar_viaje(this.viaje)
          .then(viaje => {
            console.log(viaje, 'ok');
            this.navCtrl.popTo(SupervisorListaViajesPage);
          });
      });
  }

}
