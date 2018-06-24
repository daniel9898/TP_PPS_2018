import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { ClienteReservaPage } from '../cliente-reserva/cliente-reserva';

/**
 * Generated class for the ClienteReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cliente-reservas',
  templateUrl: 'cliente-reservas.html',
})
export class ClienteReservasPage {

  /**
 * colección de vehículos
 */
  public reservas: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reservasSrv: ReservasProvider,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteReservasPage');
    this.initializeItems();
  }

  /**
 * Inicializa los vehículos
 */
  initializeItems() {
    // this.vehiculos = vehiculosMock;
    this.reservasSrv.getListaReservas().subscribe(next => {
      console.log(next);
      this.reservas = next;
    });
  }


  /**
 * Metodo para el filtrado por busqueda
 * @param ev Evento de la barra de busqueda
 */
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.reservas = this.reservas.filter((item) => {
        return (item.reserva.email.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.reserva.fecha.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /**
 * Va a la pantalla de vehículo para ver y editar el vehículo
 * @param value indice de la colección
 */
  verReserva(value) {
    console.log(value);
    this.navCtrl.push(
      ClienteReservaPage,
      {
        isEditable: false,
        reserva: this.reservas[value].reserva,
        key: this.reservas[value].key
      });
  }


  /**
 * Va a la pantalla de vehículo para generar un nuevo vehículo
 */
  nuevaReserva() {
    this.navCtrl.push(ClienteReservaPage);
  }


  /**
   * Elimina muestra una alerta y elimina la reserva
   * @param i indice de la colección
   */
  eliminarReserva(i) {
    const confirm = this.alertCtrl.create({
      title: '¿Está seguro?',
      message: 'Esta por eliminar una reserva',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.reservasSrv.deleteItem(this.reservas[i].key);
          }
        }
      ]
    });
    confirm.present();
  }

}
