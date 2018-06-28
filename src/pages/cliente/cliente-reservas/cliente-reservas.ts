import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { ClienteReservaPage } from '../cliente-reserva/cliente-reserva';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';

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
  public reservas: any[] = [];
  private usuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reservasSrv: ReservasProvider,
    public alertCtrl: AlertController,
    private auth: AuthServicioProvider,
    private usuarioServicio: UsuarioServicioProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteReservasPage');
    // this.initializeItems();
    this.loadUser();
  }

    /**
   * Metodo que carga el usuario
   */
  loadUser() {
    this.usuarioServicio.traer_un_usuario(this.auth.get_userUID())
      .then((user: any) => {
        this.usuario = user;
        this.initializeItems();
      })
      .catch((error) => {
        // this.mostrarSpinner = false;
        console.log("Ocurrió un error al traer un usuario!: " + JSON.stringify(error));
      })
  }

  /**
 * Inicializa los vehículos
 */
  initializeItems() {
    this.reservasSrv.getListaReservas().subscribe(next => {
      this.reservas = next.filter(value => value.reserva.id_cliente == this.usuario.id_usuario);
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
        console.log(item,val);
        return (item.reserva.destino.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
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
