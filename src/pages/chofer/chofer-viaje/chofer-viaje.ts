import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { Viaje } from '../../../classes/viaje';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';

@IonicPage()
@Component({
  selector: 'page-chofer-viaje',
  templateUrl: 'chofer-viaje.html',
})
export class ChoferViajePage {

  chofer : any;
  cliente : any;
  viaje: Viaje;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          public userProv: UsuarioServicioProvider,
  	          public viajesProv : ViajeServicio) {
    
  	this.chofer = this.navParams.get('chofer');
    this.viaje =  new Viaje(this.navParams.get('viaje'));
   
    console.log('CHOFER : ',this.chofer);
    console.log('VIAJE : ',this.viaje);
   
  }

  ionViewDidLoad(){
    this.traerCliente();
    
  }

  traerCliente(){ //VER EN QUE MOMENTO SE EJECUTA,ROMPE LA VISTA
  
    this.userProv.traerUsuario(this.viaje.id_cliente)
                     .then(cliente => this.cliente = cliente)
                     .catch(e => console.log(e.message));
  }

  modificarEstado(estado: string){
    this.viaje.estado = estado;
    this.viajesProv.modificar_viaje(this.viaje);
  }

 

}
