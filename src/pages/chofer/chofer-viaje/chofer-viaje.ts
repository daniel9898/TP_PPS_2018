import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
//PAGINAS
import { ChoferEncuestaPage, ListaViajesPage } from '../../index-paginas';
import { ModalPage } from '../modal/modal';
//OTROS
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-chofer-viaje',
  templateUrl: 'chofer-viaje.html',
})
export class ChoferViajePage {

  mostrarSpinner:boolean = false;
  chofer : any;
  cliente: any;
  viaje: any;
  //SUSCRIPCION
  viajesSubs : Subscription;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public userProv: UsuarioServicioProvider,
    public viajesProv: ViajeServicio,
    public utils: UtilidadesProvider) {

      this.chofer = this.navParams.get('chofer');
      this.viaje = this.navParams.get('viaje');
  }

  ionViewWillEnter() {
    this.inicializar();
    this.traerCliente();
  }

  inicializar(){
    this.mostrarSpinner = true;
    this.chofer = this.navParams.get('chofer');
    this.viaje = this.navParams.get('viaje');
    this.viajesSubs = this.viajesProv.getAllTrips().subscribe(
        lista => {
//3) OBTENER VIAJE
            this.viaje = lista.filter(v => v.id_viaje == this.chofer.id_viaje)[0];
            console.log('this.viaje ',this.viaje);
//4) VALIDAR ESTADO DEL VIAJE
              if(this.viaje.estado === 'pendiente'){
                  this.utils.showToast('Viaje desasignado');
                  this.mostrarSpinner = false;
                  this.navCtrl.setRoot(ListaViajesPage);
              }
              //Chofer tiene vehiculo asignado + viaje asignado PERO es un viaje pasado
              else
                this.mostrarSpinner = false;
            },
            error => this.utils.showErrorToast('Atención ! ' + error.json())
        )
  }

  traerCliente() { //VER EN QUE MOMENTO SE EJECUTA,ROMPE LA VISTA
    this.mostrarSpinner = true;
    this.userProv.traerUsuario(this.viaje.id_cliente)
      .then(c => { this.cliente = c; this.mostrarSpinner = false })
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

  ionViewWillLeave(){
    console.log("Se fue de lista viajes");
    this.viajesSubs.unsubscribe();
  }


}
