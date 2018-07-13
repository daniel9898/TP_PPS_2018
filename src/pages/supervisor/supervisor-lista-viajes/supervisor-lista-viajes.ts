import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { SupervisorChoferesDisponiblesPage } from '../supervisor-choferes-disponibles/supervisor-choferes-disponibles';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@IonicPage()
@Component({
  selector: 'page-supervisor-lista-viajes',
  templateUrl: 'supervisor-lista-viajes.html',
})
export class SupervisorListaViajesPage {

  viajes: Array<any>;
  //TEXTO
  idioma:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viajeSrv: ViajeServicio) {

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
    console.log('ionViewDidLoad SupervisorListaViajesPage');
    this.viajeSrv.getAllTrips().subscribe(next => {
      this.viajes = next.filter(viaje => viaje.estado !== 'cumplido');
    });
  }


  /**
   * push a la lista de choferess
   * @param index indice del array de viajes
   */
  verChoferes(index) {
    const viaje = this.viajes[index];
    this.navCtrl.push(SupervisorChoferesDisponiblesPage, { viaje: viaje, esReserva: false });
  }


  /**
   * Elimina el viaje
   * @param index indice del viaje selecionado
   */
  eliminarViaje(index) {
    const viaje = this.viajes[index]
    viaje.estado = 'cancelado';
    this.viajeSrv.modificar_viaje(viaje);
  }

}
