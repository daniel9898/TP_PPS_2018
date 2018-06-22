import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { MapaPage } from '../../index-paginas';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { GeocodingProvider } from '../../../providers/geocoding/geocoding';
import { Usuario } from '../../../classes/usuario';
import { viaje } from '../../../classes/viaje.model';

@IonicPage()
@Component({
  selector: 'page-cliente-reserva',
  templateUrl: 'cliente-reserva.html',
})
export class ClienteReservaPage {


  public fecha: Date;
  public hora: Date;
  monthNames: string[];
  monthShortNames: string[];
  daysNames: string[];
  daysShortNames: string[];
  public direccionDest: string = '';
  public direccionOrigin: string = '';
  myOriginCallbackFunction: Function;
  myDestCallbackFunction: Function;
  usuario: Usuario;
  viajeReserva: viaje;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    dateTimeSrv: DateTimeProvider,
    private auth: AuthServicioProvider,
    private usuarioServicio: UsuarioServicioProvider,
    private geo: GeocodingProvider) {
    this.hora = new Date();
    this.hora = new Date(this.hora.toLocaleTimeString());
    this.monthNames = dateTimeSrv.getMonthNames();
    this.daysNames = dateTimeSrv.getWeekDays();
    this.daysShortNames = dateTimeSrv.getWeekDaysShort();
    this.monthShortNames = dateTimeSrv.getMonthNamesShort();
    this.viajeReserva = new viaje();
    this.viajeReserva.origen_coord = [];
    this.viajeReserva.destino_coord = [];
  }

  ionViewDidLoad() {
    this.myOriginCallbackFunction = (_params) => {
      console.log("callback asignado");
      return new Promise((resolve, reject) => {
        this.direccionOrigin = _params;
        this.geo.obtenerCoordenadas(_params).then(coord => {
          this.setTripOriginCoord(coord, this.viajeReserva);
        });
        resolve();
      });
    }
    this.myDestCallbackFunction = (_params) => {
      console.log("callback asignado");
      return new Promise((resolve, reject) => {
        this.direccionDest = _params;
        this.geo.obtenerCoordenadas(_params).then(coord => {
          this.setTripDestCoord(coord, this.viajeReserva);
        });
        resolve();
      });
    }
  }

  ionViewCanEnter() {
    this.loadUser();
  }

  /**
   * Metodo que carga el usuario
   */
  loadUser() {
    this.usuarioServicio.traer_un_usuario(this.auth.get_userUID())
      .then((user: any) => {
        //console.log("USUARIO: " + JSON.stringify(user));
        this.usuario = user;
        console.log(user);
      })
      .catch((error) => {
        // this.mostrarSpinner = false;
        console.log("Ocurrió un error al traer un usuario!: " + JSON.stringify(error));
      })
  }

  /**
   * Actualizar las coordenadas del viaje
   * @param coords coordenadas obtenidas
   * @param coordToUpdate coordenadas que se van a actualizar
   */
  setTripCoord(coords: number[], coordToUpdate: number[]) {
    coordToUpdate = coords;
    console.log(this.viajeReserva, coordToUpdate);
  }

  /**
   * Establecer coordenadas origen
   * @param coordenadas coordenadas a establecer
   * @param reserva instancia de la reserva
   */
  setTripOriginCoord(coordenadas: number[], reserva: viaje) {
    reserva.origen_coord = coordenadas;
    this.viajeReserva = reserva;
    console.log(coordenadas, this.viajeReserva, reserva);
  }


  /**
   * Establecer coordenadas destino
   * @param coordenadas coordenadas a establecer
   * @param reserva instancia de la reserva
   */
  setTripDestCoord(coordenadas: number[], reserva: viaje) {
    reserva.destino_coord = coordenadas;
    this.viajeReserva = reserva;
    console.log(coordenadas, this.viajeReserva, reserva);
  }

  public setDir(dir) {
    this.direccionOrigin = dir;
  }

  /**
   * Setea la dirección de origen
   */
  setOriginDir() {
    this.navCtrl.push(MapaPage, { 'direccion': this.direccionOrigin, 'callback': this.myOriginCallbackFunction });
  }

  /**
   * Setea la dirección de destino
   */
  setDestDir() {
    this.navCtrl.push(MapaPage, { 'direccion': this.direccionDest, 'callback': this.myDestCallbackFunction });
  }

}
