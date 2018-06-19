import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//PAGINAS
import { MapaPage } from '../../index-paginas';
//clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';


@Component({
  selector: 'page-cliente-viaje',
  templateUrl: 'cliente-viaje.html',
})
export class ClienteViajePage {

  usuario:Usuario;
  mostrarSpinner:boolean = false;
  origen:string;
  destino:string;
  punto:number; // 1-Origen / 2-Destino
  //CALLBACK function (para retornar dirección desde MapaPage)
  myCallbackFunction:Function;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _auth:AuthServicioProvider,
              private _userService:UsuarioServicioProvider) {

      this.mostrarSpinner = true;
  }

  ionViewDidLoad() {

    this.traer_usuario();

    //callBack para mapa
    this.myCallbackFunction = (_params)=> {
      console.log("callback asignado");
       return new Promise((resolve, reject) => {
            if(this.punto == 1)
                this.origen = _params;
            if(this.punto == 2)
                this.destino = _params;
                resolve();
           });
    }
  }

  //TRAER UN USUARIO
  traer_usuario(){
    this.mostrarSpinner = true;
    this._userService.traer_un_usuario(this._auth.get_userUID())
      .then((user:any)=>{
        console.log("Usuario: " + JSON.stringify(user));
        this.usuario = user;
        this.origen = user.direccion;
        this.mostrarSpinner = false;
      })
      .catch((error)=>{
        this.mostrarSpinner = false;
        console.log("Error al traer usuario: " + error);
      })
  }

  //MOSTRAR MAPA
  verMapa(opcion:number){
    this.punto = opcion;
    this.navCtrl.push(MapaPage, {'direccion' : this.usuario.direccion, 'callback':this.myCallbackFunction});
  }

}
