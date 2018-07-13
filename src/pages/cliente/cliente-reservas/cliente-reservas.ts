import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { ClienteReservaPage } from '../cliente-reserva/cliente-reserva';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

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
  //TEXTO
  idioma:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reservasSrv: ReservasProvider,
    private auth: AuthServicioProvider,
    private usuarioServicio: UsuarioServicioProvider,
    private _utilitiesServ:UtilidadesProvider) {
    //IDIOMA
    this.cargar_idioma();
  }

  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }

  //CARGAR IDIOMA
  cargar_idioma(){
    this.idioma = Idioma.es;
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
   * @param i indice de la colección
   */
  eliminarReserva(i) {
    this.reservasSrv.deleteItem(this.reservas[i].key);
    this._utilitiesServ.showToast(this.idioma.pag_reservas_cliente.mensaje);
  }

}
