import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
//import { Subscription } from 'rxjs/Subscription';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';

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
    public userProv: UsuarioServicioProvider,
    public viajesProv: ViajeServicio,
    public utils: UtilidadesProvider,
    public modalCtrl: ModalController) {


    this.chofer = this.navParams.get('chofer');
    this.viaje = this.navParams.get('viaje');

    //console.log('CHOFER : ',this.chofer);


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
    if (estado != 'cumplido') {
      this.utils.showToast('Viaje en Estado : ' + estado);
    } else {
      this.chofer.viajando = false;
      this.userProv.modificar_usuario(this.chofer);
      this.showModal();
    }
  }

  showModal() {
    let contactModal = this.modalCtrl.create('ModalPage', { 'viaje': this.viaje, 'cliente':this.cliente });
    contactModal.present();
  }


}
