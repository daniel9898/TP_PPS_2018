import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//FIREBASE
import * as firebase from 'firebase/app';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ListaViajesPage } from '../../index-paginas'; 

@IonicPage()
@Component({
  selector: 'page-chofer-inicio',
  templateUrl: 'chofer-inicio.html',
})
export class ChoferInicioPage {

  usuarioSesion:any;
  asignado: boolean = false;
  vehiculos: any;
  vehiculoAsignado : any;
  userUpdate:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utils: UtilidadesProvider,
              public vehiculosProv :VehiculosProvider,
              public userProv: UsuarioServicioProvider) {
        
    this.usuarioSesion = firebase.auth().currentUser;

    this.vehiculosProv.getListaVehiculos().subscribe(
      lista => this.vehiculos = lista,
      error => this.utils.showAlert('Atención !',error.json())
    )
  }

  comenzarActividad(){
    
    this.utils.showLoading();
    console.log('vehiculos',this.vehiculos);

    try{
        this.vehiculos.map(v => {
          if(v.vehiculo.activo && !v.vehiculo.ocupado){
             this.vehiculoAsignado = v;
             this.asignado = true;
             throw 'break';
          }
        })

    }catch(e){
      console.log(e);
    }
 

    if(!this.asignado) { this.utils.showAlert('Atención !','Por el momento no hay vehiculos disponibles reintente más tarde.') }

    this.guardarVehiculo();
    this.utils.dismissLoading();
  }

  guardarVehiculo(){
    this.userProv.asignarVehiculo(this.usuarioSesion.uid,this.vehiculoAsignado.key);

  }

  listadoDeViajes(){
    this.navCtrl.setRoot(ListaViajesPage);
  }



}
