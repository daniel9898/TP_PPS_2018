import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { SupervisorChoferesDisponiblesPage } from '../supervisor-choferes-disponibles/supervisor-choferes-disponibles';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';
import { IdiomaProvider } from '../../../providers/idioma/idioma';

@IonicPage()
@Component({
  selector: 'page-supervisor-lista-reservas',
  templateUrl: 'supervisor-lista-reservas.html',
})
export class SupervisorListaReservasPage {
  reservas: any[];
  //TEXTO
  idioma:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reservasSrv: ReservasProvider,
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
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorListaReservasPage');
    this.reservasSrv.getListaReservas().subscribe(next => {
      this.reservas = next.filter(reserva => reserva.reserva.estado === 'pendiente');
      console.log(next);
    });
  }

  /**
 * push a la lista de choferes
 * @param index indice del array de viajes
 */
  verChoferes(index) {
    const viaje = this.reservas[index];
    this.navCtrl.push(SupervisorChoferesDisponiblesPage, { viaje: viaje, esReserva: true });
  }


  /**
   * Cancela la reserva
   * @param index indice del viaje selecionado
   */
  cancelarReserva(index) {
    const item = this.reservas[index]
    item.reserva.estado = 'cancelado';
    this.reservasSrv.updateItem(item.key, item.reserva);
  }

}
