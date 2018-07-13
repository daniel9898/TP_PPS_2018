import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
//PAGINAS
import { ClienteReservaPage, ClienteEncuestaPage } from '../../index-paginas';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { ClienteEncuestaServicio } from '../../../providers/cliente-encuesta-servicio/cliente-encuesta-servicio';
//CLASES
import { Usuario } from '../../../classes/usuario';
import { Viaje } from '../../../classes/viaje';
import { Encuesta_cliente } from '../../../classes/encuesta_cliente';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@Component({
  selector: 'page-cliente-historial',
  templateUrl: 'cliente-historial.html',
})
export class ClienteHistorialPage {

  mostrarSpinner:boolean = false;
  historial:string;
  usuario:Usuario;
  viajes:Viaje[] = [];
  reservas:any[] = [];
  encuestas:Encuesta_cliente[] = [];
  isAndroid: boolean = false;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              platform: Platform,
              private _authService:AuthServicioProvider,
              private _userService:UsuarioServicioProvider,
              private _viajeService:ViajeServicio,
              private _reservaService:ReservasProvider,
              private _encuestaService:ClienteEncuestaServicio) {
        //IDIOMA
        this.cargar_idioma();
        this.isAndroid = platform.is('android');
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
        this._viajeService.traer_viajes(this.usuario.id_usuario, "cliente-estado", "cumplido")
          .then((viajes:any)=>{
            console.log("VIAJES: " + JSON.stringify(viajes));
              this.viajes = viajes;
  // 3) TRAER ENCUESTAS
                  this.generar_lista_encuestas()
                    .then(()=>{
  // 4) TRAER RESERVAS
                      this._reservaService.getListaReservas().subscribe(next => {
                        this.reservas = next.filter(value => value.reserva.id_cliente == this.usuario.id_usuario && value.reserva.estado == "cumplida");
                      });
                      this.mostrarSpinner = false;
                    })
                    .catch((error)=>{ console.log("Error al traer encuestas: " + error) })

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

  // DIRECCIONAR

  verViaje(indice) {
    console.log(indice);
    this.navCtrl.push(
      ClienteReservaPage,
      {
        isEditable: false,
        reserva: this.viajes[indice],
        key: this.viajes[indice].id_viaje
      });
  }

  verReserva(indice) {
    console.log(indice);
    this.navCtrl.push(
      ClienteReservaPage,
      {
        isEditable: false,
        reserva: this.reservas[indice].reserva,
        key: this.reservas[indice].key
      });
  }

  verEncuesta(indice) {
    console.log(indice);
    this.navCtrl.push(
      ClienteEncuestaPage,
      {
        isEditable: false,
        encuesta: this.encuestas[indice],
        key: this.encuestas[indice].id_encuesta
      });
  }

}
