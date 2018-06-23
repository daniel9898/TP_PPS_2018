import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, Platform } from 'ionic-angular';
//PAGINAS
import { MapaPage, PerfilPage, ClienteEncuestaPage } from '../../index-paginas';
//clase USUARIO
import { Usuario } from '../../../classes/usuario';
import { Viaje, Viaje_texto } from '../../../classes/viaje';
//Interface MARKER
import { Marker } from '../../../interfaces/marker';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { QrServicioProvider } from '../../../providers/qr-servicio/qr-servicio';

@Component({
  selector: 'page-cliente-viaje',
  templateUrl: 'cliente-viaje.html',
})
export class ClienteViajePage {

  //validaciones
  mostrarSpinner:boolean = false;
  mostrarMapa:boolean = false;
  mostrarMsj:boolean = false;
  boton_pedir:boolean;
  boton_cancelar:boolean;
  boton_qr:boolean;
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
  //texto
  texto:any = Viaje_texto;

  //CALLBACK function (para retornar dirección/coordenadas desde MapaPage)
  myCallbackFunction:Function;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public navParams: NavParams,
              private _userService:UsuarioServicioProvider,
              private _authService:AuthServicioProvider,
              private _viajeService:ViajeServicio,
              private _qrScanner: QrServicioProvider,
              private platform:Platform) {

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
                this.viaje.origen_coord = [datos.lat, datos.lng];
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
                this.viaje.destino_coord = [datos.lat, datos.lng];
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
              //Refrescar marcadores
              this.markers = [this.origen_marker, this.destino_marker];
              //Tomar distancia
              this.viaje.distancia = Math.round(this.calcular_distancia(this.origen_marker.lat, this.origen_marker.lng, this.destino_marker.lat, this.origen_marker.lng, 'K') * 100) / 100;
              //Definir precio
              if(this.viaje.distancia * this.precio < this.precio_minimo)
                this.viaje.precio = this.precio_minimo;
              else
                this.viaje.precio = Math.round( this.viaje.distancia * this.precio);
              //Mostrar mapa
              this.mostrarMapa = true;
              this.boton_pedir = true;
            }
                resolve();
           });
    }
  }

  //TRAER UN USUARIO
  traer_usuario(){
    this.mostrarSpinner = true;
    return this._userService.traer_un_usuario(this._authService.get_userUID())
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
      id_viaje: "N/N",
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

  //INICIAR PEDIDO DE VIAJE***************************************************//
  pedir_viaje(){

    this.boton_pedir = false;
    this.boton_cancelar = true;
    this.mostrarSpinner = true;
    // ALTA VIAJE
    this._viajeService.alta_viaje(this.viaje)
      .then((key:any)=>{
        this.viaje.id_viaje = key;
    // ACTUALIZO VIAJE (key)
        this._viajeService.modificar_viaje(this.viaje)
          .then(()=>{
   // 1) VIAJE PENDIENTE: -espero proximo estado: tomado-
            this.mostrarAlerta("Viaje en proceso");
            this._viajeService.esperar_estado(this.viaje.id_viaje, "tomado")
              .then((data:any)=>{
   // 2) VIAJE TOMADO: -espero proximo estado: en curso-
                this.mostrarAlerta("Viaje tomado");
                //Activar boton QR para ver datos del chofer
                this.boton_qr = true;
                this.viaje.estado = data.estado;
                this.viaje.id_chofer = data.id_chofer;
                this.viaje.id_vehiculo = data.id_vehiculo;
                console.log("Chofer cargado: " + data.id_chofer);
                this._viajeService.esperar_estado(this.viaje.id_viaje, "en curso")
                  .then((data:any)=>{
   // 3) VIAJE EN CURSO: -espero proximo estado: cumpido-
                    this.mostrarAlerta("Viaje en curso");
                    this.boton_cancelar = false;
                    this.viaje.estado = data.estado;
                    console.log("Chofer cargado: " + data.id_chofer);
                      this._viajeService.esperar_estado(this.viaje.id_viaje, "cumplido")
                        .then((data:any)=>{
   // 4) VIAJE CUMPLIDO: -fin del viaje: ver encuesta-
                          this.mostrarAlerta("Viaje finalizado");
                          this.viaje.estado = data.estado;
                          this.mostrarSpinner = false;
                          this.mostrarMsj = true;
                          console.log("Chofer cargado: " + data.id_chofer);
                        })
                        .catch((error)=>{console.log("Error al esperar viaje -> terminado: " + error)})
                  })
                  .catch((error)=>{console.log("Error al esperar viaje -> en curso: " + error)})
              })
              .catch((error)=>{console.log("Error al esperar viaje -> tomado: " + error)})
          })
          .catch((error)=>{console.log("Error al actualizar viaje: " + error);})
      })
      .catch((error)=>{console.log("Error al dar de alta viaje: " + error);})
  }

  //DETENER PEDIDO DE VIAJE
  cancelar_viaje(){

    this._viajeService.baja_viaje(this.viaje.id_viaje)
      .then(()=>{
        this.generar_viaje_default();
        this.boton_qr = false;
        this.mostrarMapa = false;
        this.mostrarSpinner = false;
        this.mostrarAlerta("Viaje cancelado");
      })
      .catch((error)=>{
        console.log("Error al eliminar viaje: " + error);
      })
  }

  //MENSAJES AL USUARIO
  mostrarAlerta(msj:string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  //DIRECCIONAR
  direccionar(){
      //Validación para el navegador web (probar servicio)
      if(!this.platform.is('cordova')){
        this.mostrarAlerta("ALERTA: esto es una prueba desde el navegador");//Existe el código y YA fue cargado
        return;
      }

      this._qrScanner.lector_qr()
        .then((texto)=>{

          switch(texto){
            //QR PARA ENCUESTA
            case "encuesta_qr":
            if(this.viaje.estado == "cumplido")
              this.ir_encuesta();
            else
              this.mostrarAlerta("Acceso no disponible");
            break;
            //QR PARA DATOS DEL CHOFER
            case "accion_qr":
            if(this.viaje.estado != "pendiente")
              this.ir_datos_chofer();
            else
              this.mostrarAlerta("Acceso no disponible");
            break;
            //QR DESCONOCIDO
            default:
            this.mostrarAlerta("Código desconocido");
            break;
          }

        })
        .catch((error)=>{ console.log("Error en lectura QR: " + error); })
  }

  //IR A ...
  ir_datos_chofer(){
    this._userService.traer_un_usuario(this.viaje.id_chofer)
      .then((user:any)=>{
        this.navCtrl.push(PerfilPage, {'userSelected' : user, 'profile' : "cliente" });
      })
      .catch((error)=>{ console.log("Error al traer usuario: " + error); });
  }

  ir_encuesta(){
    this.navCtrl.push(ClienteEncuestaPage, { 'id_viaje' : this.viaje.id_viaje });
  }

}
