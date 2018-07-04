import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { Viaje } from '../../../classes/viaje';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';

@IonicPage()
@Component({
  selector: 'page-chofer-viaje',
  templateUrl: 'chofer-viaje.html',
})
export class ChoferViajePage {

  chofer : any;
  cliente : any;
  viaje: any;
  viajesSubsc : Subscription;
  viajes : any;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          public userProv: UsuarioServicioProvider,
  	          public viajesProv : ViajeServicio,
              public utils : UtilidadesProvider,
              public modalCtrl: ModalController) {


    this.chofer = this.navParams.get('chofer');
    this.viaje = this.navParams.get('viaje');
  
    console.log('CHOFER : ',this.chofer);
    
   
  }

  ionViewDidLoad(){

    this.traerCliente();
    
  }

  traerCliente(){ //VER EN QUE MOMENTO SE EJECUTA,ROMPE LA VISTA
  
    this.userProv.traerUsuario(this.viaje.id_cliente)
                     .then(c => this.cliente = c)
                     .catch(e => console.log(e.message));
  }

  async modificarEstado(estado: string){
    this.viaje.estado = estado;
    await this.viajesProv.modificar_viaje(this.viaje);
    console.log('viaje ',this.viaje);
    if(estado != 'cumplido'){
      this.utils.showToast('Viaje en Estado : '+estado,'success');
    }else{
      this.showModal();
    }
  }
  
  showModal() {
   let contactModal = this.modalCtrl.create('ModalPage',{viaje:this.viaje});
   contactModal.present();
 }
 

}
