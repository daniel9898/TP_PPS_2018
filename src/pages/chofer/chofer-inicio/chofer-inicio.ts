import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, MenuController } from 'ionic-angular';
//FIREBASE
import * as firebase from 'firebase/app';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ChoferEncuestaPage } from '../../../pages/index-paginas';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { vehiculo } from '../../../classes/vehiculo.model';


@IonicPage()
@Component({
  selector: 'page-chofer-inicio',
  templateUrl: 'chofer-inicio.html',
})
export class ChoferInicioPage {

  usuarioSesion:any;
  asignado: boolean;
  vehiculos: any;
  vehiculoAsignado : any;

  constructor(public navCtrl: NavController,
              public utils: UtilidadesProvider,
              public vehiculosProv :VehiculosProvider,
              public userProv: UsuarioServicioProvider,
              private barcodeScanner: BarcodeScanner,
              public menu: MenuController,) {
        
    this.usuarioSesion = firebase.auth().currentUser;

    this.vehiculosProv.getListaVehiculos().subscribe(
      lista => this.vehiculos = lista,
      error => this.utils.showAlert('Atención !',error.json())
    )
  }

  async comenzarActividad(){

    console.log('vehiculos',this.vehiculos);

    try{
        this.asignado = false;
        let barcodeData = await this.barcodeScanner.scan();
        console.log('Barcode data', barcodeData);

        this.vehiculos.map(v => {
          if(barcodeData.text == v.vehiculo.patente && v.vehiculo.activo && !v.vehiculo.ocupado){
             this.vehiculoAsignado = v;
             this.asignado = true;
             throw 'break';
          }
        })

        console.log('this.vehiculoAsignado', this.vehiculoAsignado);
        if(!this.asignado) { this.utils.showAlert('Atención !','Vehiculo no disponible o codigo incorrecto, reintente.') }

    }catch(e){
      console.log(e);
    }

    try{
        if(this.asignado){
           this.menu.enable(false);
           await this.asignarVehiculo();
           this.vehiculoAsignado.vehiculo.ocupado = true;
           await this.actualizarDisponibilidad(this.vehiculoAsignado.key, this.vehiculoAsignado.vehiculo);
        }
    }catch(e){
       this.utils.showAlert('Atención : ',e.message);
    }

  }

  async asignarVehiculo(){
    this.userProv.asignarVehiculo(this.usuarioSesion.uid,this.vehiculoAsignado.key);
  }
  //FALTA VER EN QUE MOMENTO SE LIBERA 

  async actualizarDisponibilidad(key: string, vehiculo: vehiculo){ 
     this.vehiculosProv.updateItem(key,vehiculo);
  }

  listadoDeViajes(){
    //this.navCtrl.setRoot(ListaViajesPage);
    this.navCtrl.setRoot(ChoferEncuestaPage);
  }



}
