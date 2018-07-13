import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//PAGINAS
import { ClienteEncuestaPage } from '../../index-paginas';
//CLASES
import { Usuario } from '../../../classes/usuario';
import { Viaje } from '../../../classes/viaje';
import { Encuesta_cliente } from '../../../classes/encuesta_cliente';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { ClienteEncuestaServicio } from '../../../providers/cliente-encuesta-servicio/cliente-encuesta-servicio';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@Component({
  selector: 'page-cliente-encuestas',
  templateUrl: 'cliente-encuestas.html',
})
export class ClienteEncuestasPage {

  mostrarSpinner:boolean = false;
  viajes:Viaje[] = [];
  viajes_sinEncuesta:Viaje[] = [];
  encuestas:Encuesta_cliente[] = [];
  usuario:Usuario;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _authService:AuthServicioProvider,
              private _userService:UsuarioServicioProvider,
              private _viajeService:ViajeServicio,
              private _encuestaService:ClienteEncuestaServicio) {
      //IDIOMA
      this.cargar_idioma();
      this.mostrarSpinner = true;
  }
  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }
  //CARGAR IDIOMA
  cargar_idioma(){
    this.idioma = Idioma.es;
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
            this.generar_lista_encuestas()
              .then(()=>{
                this.generar_viajes_sin_encuesta()
                  .then(()=>{
                    this.mostrarSpinner = false;
                  })
              })
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
          this.encuestas = encuestas;
          resolve();
        })
        .catch((error)=>{ console.log("Error al traer encuestas: " + error); resolve() })
    });
    return promesa;
  }

  generar_viajes_sin_encuesta(){
    let promesa = new Promise((resolve, reject)=>{
      let existe:boolean;
      for(let viaje of this.viajes){
        existe = false;
        for(let encuesta of this.encuestas){
          if(viaje.id_viaje == encuesta.id_viaje){
            existe = true;
          }
        }
        if(!existe)
          this.viajes_sinEncuesta.push(viaje);
      }
      resolve();
    });
    return promesa;
  }

  irEncuesta(indice) {
    //console.log(indice);
    this.navCtrl.push(ClienteEncuestaPage, { 'id_viaje' : this.viajes_sinEncuesta[indice].id_viaje });
  }

}
