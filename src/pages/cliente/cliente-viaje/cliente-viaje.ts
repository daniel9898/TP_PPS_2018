import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//PAGINAS
import { MapaPage } from '../../index-paginas';
//clase USUARIO
import { Usuario } from '../../../classes/usuario';
import { Viaje } from '../../../classes/viaje';
//Interface MARKER
import { Marker } from '../../../interfaces/marker';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';

@Component({
  selector: 'page-cliente-viaje',
  templateUrl: 'cliente-viaje.html',
})
export class ClienteViajePage {



  //validaciones
  mostrarSpinner:boolean = false;
  mostrarMapa:boolean = false;
  punto:number; // 1-Origen / 2-Destino
  //clases
  usuario:Usuario;
  viaje:Viaje;
  //valores
  viaje_default:any;
  fecha:string;
  hora:string;
  //mapa
  markers:Marker[] = [];
  origen_marker:Marker;
  destino_marker:Marker;
  precio:number = 18; // por KM
  precio_minimo:number = 60;

  //CALLBACK function (para retornar dirección desde MapaPage)
  myCallbackFunction:Function;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _auth:AuthServicioProvider,
              private _userService:UsuarioServicioProvider) {

                //get api uses

      this.mostrarSpinner = true;
  }

  ionViewDidLoad() {

    this.traer_usuario()
      .then(()=>{
        this.generar_viaje_default();
      })

    //callBack para mapa
    this.myCallbackFunction = (datos)=> {
      console.log("callback asignado");
       return new Promise((resolve, reject) => {
            // ORIGEN
            if(this.punto == 1){
                this.viaje.origen = datos.direccion;
                this.origen_marker = ({
                  lat: datos.lat,
                  lng: datos.lng,
                  label: "Origen",
                  icon: "assets/imgs/marker_person.png",
                  draggable: false
                });
            }
            // DESTINO
            if(this.punto == 2){
                this.viaje.destino = datos.direccion;
                this.destino_marker = ({
                  lat: datos.lat,
                  lng: datos.lng,
                  label: "Destino",
                  icon: "assets/imgs/marker_finish.png",
                  draggable: false
                });
            }
            // CALCULAR DISTANCIA Y MOSTRAR MAPA
            if(this.viaje.origen != "N/N" && this.viaje.destino != "N/N"){
              this.markers = [this.origen_marker, this.destino_marker];
              this.viaje.distancia = Math.round(this.calcular_distancia(this.origen_marker.lat, this.origen_marker.lng, this.destino_marker.lat, this.origen_marker.lng, 'K') * 100) / 100;
              if(this.viaje.distancia * this.precio < this.precio_minimo)
                this.viaje.precio = this.precio_minimo;
              else
                this.viaje.precio = Math.round( this.viaje.distancia * this.precio);
              this.mostrarMapa = true;
            }

                resolve();
           });
    }
  }

  //TRAER UN USUARIO
  traer_usuario(){
    this.mostrarSpinner = true;
    return this._userService.traer_un_usuario(this._auth.get_userUID())
            .then((user:any)=>{
              console.log("Usuario: " + JSON.stringify(user));
              this.usuario = user;
              this.mostrarSpinner = false;
            })
            .catch((error)=>{
              this.mostrarSpinner = false;
              console.log("Error al traer usuario: " + error);
            })
  }

  //ARMAR VIAJE BASE
  generar_viaje_default(){

    this.mostrarSpinner = true;
    this.generar_fecha();

    this.viaje_default = {
      key: "N/N",
      id_cliente: this.usuario.id_usuario,
      id_chofer:"N/N",
      id_vehiculo:"N/N",
      fecha:this.fecha,
      hora:this.hora,
      cod_fecha: new Date().valueOf().toString(),
      origen: "N/N",
      origen_coord:[1,1],
      destino:"N/N",
      destino_coord:[1,1],
      distancia: 0,
      precio: 0,
      estado:"pendiente"
    }
    this.viaje = new Viaje(this.viaje_default);
    console.log("Datos generados de fecha: " + JSON.stringify(this.viaje));
    this.mostrarSpinner = false;
  }

  //GENERAR FECHA
  generar_fecha(){
    let currentDate = new Date();
    //console.log("FECHA completa: " + currentDate);
    this.fecha = currentDate.getDate()+'/'+(currentDate.getMonth() + 1)+'/'+currentDate.getFullYear();
    console.log("Fecha: " + this.fecha);
    this.hora = currentDate.getHours().toString()+':'+ (currentDate.getMinutes()<10?'0':'').toString() +currentDate.getMinutes().toString();
    console.log("Hora: " + this.hora);
  }

  //MOSTRAR MAPA
  verMapa(opcion:number){
    this.punto = opcion;
    let mostrar_direccion:string;
    if(opcion == 1)
      mostrar_direccion = this.viaje.origen;
    else
      (opcion == 2)
      mostrar_direccion = this.viaje.destino;

    this.navCtrl.push(MapaPage, {'direccion' : mostrar_direccion, 'callback':this.myCallbackFunction});
  }

  //METODO PARA CALCULAR DISTANCIA ENTRE DOS PUNTOS
  calcular_distancia(lat1, lon1, lat2, lon2, unit){
    let radlat1 = Math.PI * lat1/180
  	let radlat2 = Math.PI * lat2/180
  	let theta = lon1-lon2
  	let radtheta = Math.PI * theta/180
  	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  	dist = Math.acos(dist)
  	dist = dist * 180/Math.PI
  	dist = dist * 60 * 1.1515
  	if (unit=="K") { dist = dist * 1.609344 }
  	if (unit=="N") { dist = dist * 0.8684 }
  	return dist
  }

}
