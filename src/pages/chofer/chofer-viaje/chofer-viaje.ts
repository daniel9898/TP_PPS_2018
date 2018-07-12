import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
//import { Subscription } from 'rxjs/Subscription';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
//PAGINAS
import { ChoferEncuestaPage, ListaViajesPage } from '../../index-paginas';
import { ModalPage } from '../modal/modal';

@IonicPage()
@Component({
  selector: 'page-chofer-viaje',
  templateUrl: 'chofer-viaje.html',
})
export class ChoferViajePage {

  chofer : any;
  cliente: any;
  viaje: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public userProv: UsuarioServicioProvider,
    public viajesProv: ViajeServicio,
    public utils: UtilidadesProvider) {


    this.chofer = this.navParams.get('chofer');
    this.viaje = this.navParams.get('viaje');

    console.log('CHOFER EN VIAJE: ', this.chofer.id_viaje);


  }

  ionViewDidLoad() {

    this.traerCliente();

  }

  traerCliente() { //VER EN QUE MOMENTO SE EJECUTA,ROMPE LA VISTA

    this.userProv.traerUsuario(this.viaje.id_cliente)
      .then(c => this.cliente = c)
      .catch(e => console.log(e.message));
  }

  async modificarEstado(estado: string) {
    this.viaje.estado = estado;
    await this.viajesProv.modificar_viaje(this.viaje);
    console.log('viaje ', this.viaje);
    switch(estado){
      case 'pendiente'://Chofer cancela el viaje
      this.chofer.id_viaje = "" //Desasignación
      this.userProv.modificar_usuario(this.chofer)
        .then(()=>{ this.navCtrl.setRoot(ListaViajesPage) })
      break;
      case 'en curso':
      this.utils.showToast('Viaje en Estado : ' + estado);
      break;
      case 'cumplido':
      this.showPage();
      break;
    }
  }

  encuestaChofer() {
    this.navCtrl.push(ChoferEncuestaPage, { vehiculo: this.viaje.id_vehiculo, chofer: this.viaje.id_chofer, desdeInicio: false });
  }

  showPage() {
    this.navCtrl.setRoot(ModalPage, { 'viaje': this.viaje, 'cliente':this.cliente });
  }


}
