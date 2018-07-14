import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { Viaje } from '../../../classes/viaje';
import { SupervisorListaViajesPage } from '../supervisor-lista-viajes/supervisor-lista-viajes';
import { Usuario } from '../../../classes/usuario';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { Reserva } from '../../../classes/viaje.model';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';
import { IdiomaProvider } from '../../../providers/idioma/idioma';

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
  //TEXTO
  idioma:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioSrv: UsuarioServicioProvider,
    public viajeSrv: ViajeServicio,
    private reservaSrv: ReservasProvider,
    private _idiomaSrv: IdiomaProvider) {
      //IDIOMA
      this.idioma = Idioma.es;
      if (!this.navParams.data.esReserva) {
        if (this.navParams.data.viaje && this.navParams.data.chofer) {
          this.viaje = this.navParams.data.viaje;
          this.chofer = this.navParams.data.chofer;
          this.esReserva = this.navParams.data.esReserva;
          console.log("VIAJE: " + JSON.stringify(this.viaje), "CHOFER: " + JSON.stringify(this.chofer));
        }
      } else if (this.navParams.data.esReserva) {
        this.reserva = this.navParams.data.viaje.reserva;
        this.key = this.navParams.data.viaje.key;
        this.esReserva = this.navParams.data.esReserva;
      }

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
    console.log('SupervisorAsignaViajePage página cargada');
  }

  public asignarViaje() {
    this.chofer.id_viaje = this.viaje.id_viaje;
    this.usuarioSrv.modificar_usuario(this.chofer)
      .then(result => {
        console.log(result, 'ok')
        this.viaje.id_chofer = this.chofer.key;
        this.viaje.id_vehiculo = this.chofer.id_vehiculo;
        this.viaje.estado = 'tomado';
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
        this.viaje.id_vehiculo = '';
        this.viaje.estado = 'pendiente';
        this.viajeSrv.modificar_viaje(this.viaje)
          .then(viaje => {
            console.log(viaje, 'ok');
            this.navCtrl.popTo(SupervisorListaViajesPage);
          });
      });
  }

}
