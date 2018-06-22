import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { MapaPage } from '../../index-paginas';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';

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
  usuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    dateTimeSrv: DateTimeProvider,
    public auth: AuthServicioProvider,
    public usuarioServicio: UsuarioServicioProvider) {
    this.hora = new Date();
    this.hora = new Date(this.hora.toLocaleTimeString());
    this.monthNames = dateTimeSrv.getMonthNames();
    this.daysNames = dateTimeSrv.getWeekDays();
    this.daysShortNames = dateTimeSrv.getWeekDaysShort();
    this.monthShortNames = dateTimeSrv.getMonthNamesShort();
  }

  ionViewDidLoad() {
    this.myOriginCallbackFunction = (_params) => {
      console.log("callback asignado");
      return new Promise((resolve, reject) => {
        this.direccionOrigin = _params;
        resolve();
      });
    }
    this.myDestCallbackFunction = (_params) => {
      console.log("callback asignado");
      return new Promise((resolve, reject) => {
        this.direccionDest = _params;
        resolve();
      });
    }
  }

  ionViewCanEnter(){
    this.loadUser();
  }

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
