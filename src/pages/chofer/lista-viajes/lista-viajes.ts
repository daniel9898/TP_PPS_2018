import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController} from 'ionic-angular';
//PAGINAS
import { ChoferInicioPage, ChoferViajePage, ChoferEncuestaPage } from '../../index-paginas';
//SERVICIOS
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { IdiomaProvider } from '../../../providers/idioma/idioma';
//OTROS
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@IonicPage()
@Component({
  selector: 'page-lista-viajes',
  templateUrl: 'lista-viajes.html',
})
export class ListaViajesPage {

  //SPINNER
  mostrarSpinner:boolean = false;
  //DATOS
  viajes : any;
  chofer : any;
  viajesSubsc : Subscription;
  viajeAsignado = [];
  usuarioSesion:any;
  usersSubs : Subscription;
  vehiculosSubs: Subscription;
  viajesSubs : Subscription;
  viaje: any;
  hayViaje:boolean = false;
  liberoVehiculo:boolean = false;
  fecha:string;
  hora:string;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
              public viajesProv : ViajeServicio,
              public usuarioSrv: UsuarioServicioProvider,
              public vehiculoSrv: VehiculosProvider,
              public menu: MenuController,
              public utils: UtilidadesProvider,
              public aut : AuthServicioProvider,
              public _idiomaSrv: IdiomaProvider) {
    //IDIOMA
    this.idioma = Idioma.es;
    this.mostrarSpinner = true;
    this.menu.enable(true);
    this.usuarioSesion = firebase.auth().currentUser;

  }

  ionViewWillEnter(){
    console.log("Se está ingresando en lista viajes");
    this.cargar_idioma();
  }
  //CARGAR IDIOMA
  cargar_idioma(){
  this._idiomaSrv.getLanguageFromStorage()
    .then((idioma)=>{
      this.idioma = idioma;
      this.inicializar();
      this.generar_fecha();
      this.traerViajes();
    })
  }

  //PRIMERA VALIDACION: chofer + viaje actual
  inicializar(){
    this.mostrarSpinner = true;
    this.usersSubs = this.usuarioSrv.getUsers().subscribe(
    //Si se cambia un dato de chofer se re-ejecuta. Por ejemplo: supervisor asigna viaje
    lista => {

  //1) OBTENER CHOFER
        this.chofer = lista.filter(v => v.id_usuario == this.usuarioSesion.uid);
        console.log('Chofer en lista viajes: ',this.chofer[0]);
        if(this.chofer[0].id_viaje != '' && this.chofer[0].id_viaje != null){
            this.hayViaje = true;
            this.viajesSubs = this.viajesProv.getAllTrips().subscribe(
                lista => {
  //2) OBTENER VIAJE
                    this.viaje = lista.filter(v => v.id_viaje == this.chofer[0].id_viaje)[0];
                    console.log('VIAJE en lista viaje: ',this.viaje);
  //3) VALIDAR VIAJE
                    if(this.viaje.estado != 'pendiente' && this.viaje.estado != 'cancelado' && this.viaje.estado != 'cumplido'){
                        this.viaje.id_vehiculo = this.chofer[0].id_vehiculo;
                        this.viajesProv.modificar_viaje(this.viaje)
                        .then(v =>{

                            this.utils.showToast(this.idioma.pag_lista_viajes_chofer.mensaje.msj_1);
                            this.mostrarSpinner = false;
                            this.navCtrl.push(ChoferViajePage,{viaje :this.viaje, chofer: this.chofer[0]});

                        } )
                        .catch(error => console.log('error ',error))
                    }
                    else
                      this.mostrarSpinner = false;
                },
                error => this.utils.showErrorToast(this.idioma.pag_lista_viajes_chofer.mensaje.msj_2 + error.json())
            )
        }else
          this.mostrarSpinner = false;
      },
      error => this.utils.showErrorToast(this.idioma.pag_lista_viajes_chofer.mensaje.msj_2 + error.json())
    )
  }

  //GENERAR FECHA
  generar_fecha(){
    let promesa = new Promise((resolve, reject)=>{
      let currentDate = new Date();
      this.fecha = currentDate.getFullYear()+'-'+(currentDate.getMonth()<10?'0':'').toString()+(currentDate.getMonth() + 1)+'-'+(currentDate.getDate()<10?'0':'').toString()+currentDate.getDate();
      console.log("Fecha actual: " + this.fecha);
      this.hora = (currentDate.getHours()<10?'0':'').toString() + currentDate.getHours().toString()+':'+ (currentDate.getMinutes()<10?'0':'').toString() +currentDate.getMinutes().toString();
      resolve();
    });
    return promesa;
  }

  //ESTADOS DE UN VIAJE: cancelado / pendiente / tomado / en curso / cumplido
  traerViajes(){
    //TRAER VIAJES de fecha actual
    this.viajesSubsc = this.viajesProv.traerViajes()
    .subscribe(
      viajes => {
        this.viajes = viajes.filter(v => v.estado == 'pendiente' && v.fecha == this.fecha);

      },
      error =>  console.log("error ",error)
    )

  }

  async viajeSeleccionado(viaje:any){

    this.mostrarSpinner = true;
    this.chofer[0].id_viaje = viaje.id_viaje;
    viaje.id_chofer = this.chofer[0].id_usuario;
    viaje.id_vehiculo = this.chofer[0].id_vehiculo;
    viaje.estado = 'tomado';
    console.log("VIAJE SELECCIONADO: " + JSON.stringify(viaje));
    console.log("Viaje chofer: " + viaje.id_chofer);
    console.log("Viaje vehiculo: " + viaje.id_vehiculo);
    this.usuarioSrv.modificar_usuario(this.chofer[0])
      .then(()=>{
        this.viajesProv.modificar_viaje(viaje)
          .then(()=>{
            this.mostrarSpinner = false;
            //REDIRECCIONAMIENTO DIRECTO
          })
      })


  }

  encuestaChofer() {
    this.navCtrl.push(ChoferEncuestaPage, { vehiculo: this.chofer[0].id_vehiculo, chofer: this.chofer[0].id_usuario, desdeInicio: false });
  }

  liberarVehiculo(){
    this.vehiculosSubs = this.vehiculoSrv.getListaVehiculos().subscribe(next => {
      var vehiculos = next.filter(itemVehiculo => itemVehiculo.vehiculo.patente == this.chofer[0].id_vehiculo);
      if(vehiculos.length > 0)
      {
        vehiculos[0].vehiculo.ocupado = false;
        this.vehiculoSrv.updateItem(vehiculos[0].key,vehiculos[0].vehiculo);
        this.chofer[0].id_vehiculo = '';
        this.usuarioSrv.modificar_usuario(this.chofer[0])
          .then(()=>{
            this.liberoVehiculo = true;
            this.navCtrl.setRoot(ChoferInicioPage);
          })
      }
    });
  }

  ionViewWillLeave(){
    console.log("Se fue de lista viajes");
    this.usersSubs.unsubscribe();
    if(this.liberoVehiculo)
      this.vehiculosSubs.unsubscribe();
    if(this.hayViaje)
      this.viajesSubs.unsubscribe();
  }



}
