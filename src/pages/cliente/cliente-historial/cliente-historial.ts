import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
//PAGINAS
//import { ClienteReservaPage, ClienteEncuestaPage } from '../../index-paginas';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { ClienteEncuestaServicio } from '../../../providers/cliente-encuesta-servicio/cliente-encuesta-servicio';
//clase USUARIO
import { Usuario } from '../../../classes/usuario';
import { Viaje } from '../../../classes/viaje';
import { Reserva } from '../../../classes/viaje.model';
import { Encuesta_cliente } from '../../../classes/encuesta_cliente';

@Component({
  selector: 'page-cliente-historial',
  templateUrl: 'cliente-historial.html',
})
export class ClienteHistorialPage {

  mostrarSpinner:boolean = false;
  historial:string;
  usuario:Usuario;
  viajes:Viaje[] = [];
  reservas:Reserva[] = [];
  encuestas:Encuesta_cliente[] = [];
  isAndroid: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              platform: Platform,
              private _authService:AuthServicioProvider,
              private _userService:UsuarioServicioProvider,
              private _viajeService:ViajeServicio,
              private _reservaService:ReservasProvider,
              private _encuestaService:ClienteEncuestaServicio) {

        this.isAndroid = platform.is('android');
        this.mostrarSpinner = true;
  }

  ionViewDidLoad() {
    this._userService.traer_un_usuario(this._authService.get_userUID())
  // 1) TRAER UN USUARIO
      .then((user:any)=>{
        this.usuario = user;
  // 2) TRAER VIAJES
        this._viajeService.traer_viajes(this.usuario.id_usuario, "cliente")
          .then((viajes:any)=>{
              this.viajes = viajes;
  // 3) TRAER RESERVAS
              this._reservaService.traer_reservas(this.usuario.id_usuario, "cliente")
                .then((reservas:any)=>{
                  this.reservas = reservas;
  // 4) TRAER ENCUESTAS
                  this.generar_lista_encuestas()
                    .then(()=>{ this.mostrarSpinner = false; })
                })
                .catch(()=>{ console.log("Error al traer reservas") })
          })
          .catch((error)=>{ console.log("Error al traer viajes: " + error) })
      })
      .catch((error)=>{ console.log("Error al traer usuario: " + error) })
  }


  generar_lista_encuestas(){
    let promesa = new Promise((resolve, reject)=>{
      this._encuestaService.traer_encuestas(null, "todos")
        .then((encuestas:any)=>{
          //console.log("Encuestas!: " + JSON.stringify(encuestas));
          for(let encuesta of encuestas){
            for(let viaje of this.viajes){
              if(encuesta.id_viaje == viaje.id_viaje)
                this.encuestas.push(encuesta);
            }
          }
          resolve();
        })
        .catch((error)=>{ console.log("Error al traer encuestas: " + error); resolve() })
    });
    return promesa;
  }

}
