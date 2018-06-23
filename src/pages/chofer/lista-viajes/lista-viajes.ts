import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import * as firebase from 'firebase/app';
import { ChoferViajePage } from '../../index-paginas'; 

@IonicPage()
@Component({
  selector: 'page-lista-viajes',
  templateUrl: 'lista-viajes.html',
})
export class ListaViajesPage {

  viajes :any;
  chofer : any;
  usuarioSesion:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viajesProv : ViajeServicio,
              public userProv: UsuarioServicioProvider) {

  	this.traerViajes();
    this.usuarioSesion = firebase.auth().currentUser;
    this.traerUsuario();
    console.log(this.chofer);
  }
  //cancelado / pendiente / tomado / en curso / cumplido
  async traerUsuario(){
  	try{
        this.chofer = await this.userProv.traerUsuario(this.usuarioSesion.uid);
        console.log(this.chofer);
  	}catch(e){
        console.log(e.message);
  	}
  	
  }

  async traerViajes(){
  	try{
        this.viajes = await this.viajesProv.traer_viajes('pendiente','estado');
        console.log(this.viajes);
  	}catch(e){
        console.log(e.message);
  	}

  }

  async viajeSeleccionado(viaje:any){
    
    viaje.id_chofer = this.usuarioSesion.uid;
    viaje.id_vehiculo = this.chofer.id_vehiculo;
    viaje.estado = 'tomado';
    await this.viajesProv.modificar_viaje(viaje);
    this.navCtrl.push(ChoferViajePage, {viaje: viaje, chofer: this.chofer});
  }

  

  

}
