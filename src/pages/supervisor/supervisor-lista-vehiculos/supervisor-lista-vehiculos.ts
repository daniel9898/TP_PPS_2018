import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupervisorRegistroVehiculoPage } from '../../index-paginas';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';
import { IdiomaProvider } from '../../../providers/idioma/idioma';


@IonicPage()
@Component({
  selector: 'page-supervisor-lista-vehiculos',
  templateUrl: 'supervisor-lista-vehiculos.html',
})
export class SupervisorListaVehiculosPage {
  /**
   * colección de vehículos
   */
  public vehiculos: any[];
  //TEXTO
  idioma:any;
  /**
   *
   * @param navCtrl controller de navegación
   * @param navParams controller de parametros entre paginas
   * @param vehiculosSrv servicio de vehículo
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private vehiculosSrv: VehiculosProvider,
    private _utilitiesServ:UtilidadesProvider,
    private _idiomaSrv: IdiomaProvider) {
      //IDIOMA
      this.idioma = Idioma.es;
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
        this.initializeItems();
      })
  }

  ionViewDidLoad() {

  }

  /**
   * Inicializa los vehículos
   */
  initializeItems() {
    // this.vehiculos = vehiculosMock;
    this.vehiculosSrv.getListaVehiculos().subscribe(next => {
      console.log(next);
      this.vehiculos = next;
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
      this.vehiculos = this.vehiculos.filter((item) => {
        return (item.vehiculo.marca.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.vehiculo.modelo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /**
   * Va a la pantalla de vehículo para ver y editar el vehículo
   * @param value indice de la colección
   */
  verVehiculo(value) {
    console.log(value);
    this.navCtrl.push(
      SupervisorRegistroVehiculoPage,
      {
        isEditable: false,
        vehiculo: this.vehiculos[value].vehiculo,
        key: this.vehiculos[value].key
      });
  }

  /**
   * Va a la pantalla de vehículo para generar un nuevo vehículo
   */
  nuevoVehiculo() {
    this.navCtrl.push(SupervisorRegistroVehiculoPage, { isEditable: true });
  }

  /**
   * Elimina muestra una alerta y elimina el vehículo
   * @param i indice de la colección
   */
  eliminarVehiculo(i) {
    this.vehiculosSrv.deleteItem(this.vehiculos[i].key);
    this._utilitiesServ.showToast(this.idioma.pag_lista_vehiculos_supervisor.mensaje);

  }

}
