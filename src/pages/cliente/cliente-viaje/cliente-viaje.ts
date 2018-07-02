import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, Platform } from 'ionic-angular';
//PAGINAS
import { MapaPage, PerfilPage, ClienteEncuestaPage } from '../../index-paginas';
//CLASES
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
  mostrarMsjFinal:boolean = false;
  mostrarMsjMedio:boolean = false;
  mostrarPrecio:boolean = false;
  mostrarDatos_chofer:boolean = false;
  boton_pedir:boolean;
  boton_cancelar:boolean;
  boton_qr:boolean;
  punto:number; // 1-Origen / 2-Destino
  //clases
  usuario:Usuario;
  chofer:Usuario;
  viaje:Viaje;
  //valores
  viaje_default:any;
  fecha:string;
  hora:string;
  //mapa
  markers:Marker[] = [];
  origen_marker:Marker;
  destino_marker:Marker;
  options:any;
  directionsService:any;
  request_directions:any;
  precio:number = 18; // por KM
  precio_minimo:number = 60;
  //texto
  texto:any = Viaje_texto;
  msj_estado:string;

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
      this.directionsService = new google.maps.DirectionsService();
      this.options = {
          suppressMarkers: true,
      };
  }

  ionViewDidLoad() {
    this.generar_fecha();
    let hora = this.hora.split(':');
    let horaActual = parseInt(hora[0]);
    //VALIDAR = NUEVA VIAJE vs VIAJE PROCESADO
    this.traer_usuario(this._authService.get_userUID(), "cliente")
      .then(()=>{

        this._viajeService.traer_un_viaje_actual(this.usuario.id_usuario, this.fecha, horaActual)
          .then((data:any)=>{
            if(data){
              console.log("DATA: " + JSON.stringify(data));
              this.viaje = data;
              this.validar_espera();
            }
            else{
              this.generar_viaje_default();
              this.mostrarSpinner = false;
            }
          })
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
                  label: "origen",
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
                  label: "destino",
                  icon: "assets/imgs/marker_finish.png",
                  draggable: false
                });
            }
            // CALCULAR DISTANCIA Y MOSTRAR MAPA
            if(this.viaje.origen != "N/N" && this.viaje.destino != "N/N"){
              //Refrescar marcadores
              this.markers = [this.origen_marker, this.destino_marker];
              //Tomar distancia
              this.request_directions= {
                origin      : this.viaje.origen,
                destination : this.viaje.destino,
                travelMode  : 'DRIVING'
              };
              this.medir_distancia()
                .then((distancia:number)=>{
                  this.viaje.distancia = Math.round(distancia);
                  //Definir precio
                  if(this.viaje.distancia * this.precio < this.precio_minimo)
                    this.viaje.precio = this.precio_minimo;
                  else
                    this.viaje.precio = Math.round( this.viaje.distancia * this.precio);
                  //Mostrar mapa
                  this.mostrarMapa = true;
                  this.mostrarPrecio = true;
                  this.boton_pedir = true;
                })
                .catch((error)=>{ console.log("Error al calcular distancia: " + error); })
            }
                resolve();
           });
    }
  }

  //TRAER UN USUARIO
  traer_usuario(uid:string, usuario:string){
    this.mostrarSpinner = true;
    return this._userService.traer_un_usuario(uid)
            .then((user:any)=>{
              console.log("Usuario: " + JSON.stringify(user));
              if(usuario == "cliente")
                this.usuario = user;
              if(usuario == "chofer")
                this.chofer = user;

            })
            .catch((error)=>{ console.log("Error al traer usuario: " + error); })
  }

  //ARMAR VIAJE BASE
  generar_viaje_default(){

    this.mostrarSpinner = true;
    this.viaje_default = {
      id_viaje: "N/N",
      id_cliente: this.usuario.id_usuario,
      id_chofer:"N/N",
      id_vehiculo:"N/N",
      fecha:"N/N",
      hora:"N/N",
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
    //console.log("Datos generados de fecha: " + JSON.stringify(this.viaje));
    this.mostrarSpinner = false;
  }

  //GENERAR FECHA
  generar_fecha(){
    let currentDate = new Date();
    //console.log("FECHA completa: " + currentDate);
    //this.fecha = currentDate.getDate()+'/'+(currentDate.getMonth() + 1)+'/'+currentDate.getFullYear();
    this.fecha = currentDate.getFullYear()+'-'+(currentDate.getMonth()<10?'0':'').toString()+(currentDate.getMonth() + 1)+'-'+(currentDate.getDate()<10?'0':'').toString()+currentDate.getDate();
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

  //MEDIR DISTANCIA CON DIRECTIONS
  medir_distancia(){

    let promesa = new Promise((resolve, reject)=>{
        let distancia:number;
        this.directionsService.route(this.request_directions, (response, status)=> {
          if ( status == google.maps.DirectionsStatus.OK ) {
            distancia = response.routes[0].legs[0].distance.value / 1000; // the distance in metres / 1000 = KM
            resolve(distancia);
          }
          else {
            console.log("Error al calcular distancia");
            resolve(false);
          }
        });
    });
    return promesa;
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
    this.mostrarMapa = false;
    this.mostrarSpinner = true;
    this.generar_fecha();
    // ACTUALIZO FECHA + HORA
    this.viaje.fecha = this.fecha;
    this.viaje.cod_fecha = new Date().valueOf().toString();
    this.viaje.hora = this.hora;
    // ALTA VIAJE
    this._viajeService.alta_viaje(this.viaje)
      .then((key:any)=>{
        this.viaje.id_viaje = key;
    // ACTUALIZO VIAJE (key)
        this._viajeService.modificar_viaje(this.viaje)
          .then(()=>{
            this.boton_cancelar = true;
    // ACTUALIZO USUARIO
            this.usuario.viajando = true;
            this._userService.modificar_usuario(this.usuario)
              .then(()=>{
                console.log("Usuario ocupado - en viaje");
                // VALIDO ESTADO
                this.validar_espera();
              })
              .catch((error)=>{ console.log("Error al actualizar usuario: " + error); });
          })
          .catch((error)=>{console.log("Error al actualizar viaje: " + error);})
      })
      .catch((error)=>{console.log("Error al dar de alta viaje: " + error);})
  }

  //VALIDAR CAMBIOS DE ESTADO
  validar_espera(){

    this._viajeService.esperar_estado(this.viaje.id_viaje)
    .subscribe((viaje:any)=>{
      viaje.forEach((item) => {
          console.log("Estado del viaje: " + item.estado);
          this.viaje = item;
          switch(this.viaje.estado){
        // 1) VIAJE A LA ESPERA DE UN CHOFER
            case "pendiente":
            this.mostrarAlerta(this.texto.estados.pendiente);
            this.msj_estado = this.texto.estados.pendiente;
            this.mostrarSpinner = true;
            //Asignar marcadores
            this.origen_marker = ({
              lat: this.viaje.origen_coord[0],
              lng: this.viaje.origen_coord[1],
              label: "Origen",
              icon: "assets/imgs/marker_person.png",
              draggable: false
            });
            this.destino_marker = ({
              lat: this.viaje.destino_coord[0],
              lng: this.viaje.destino_coord[1],
              label: "Destino",
              icon: "assets/imgs/marker_finish.png",
              draggable: false
            });
            //Refrescar marcadores
            this.markers = [this.origen_marker, this.destino_marker];
            //Habilitar vistas
            this.mostrarMsjMedio = true;
            this.boton_pedir = false;
            this.mostrarMapa = true;
            this.boton_cancelar = true;
            this.mostrarPrecio = true;
            this.mostrarDatos_chofer = false;
            break;
        // 2) VIAJE TOMADO POR UN CHOFER
            case "tomado":
            this.mostrarAlerta(this.texto.estados.tomado);
            this.msj_estado = this.texto.estados.tomado;
            this.mostrarSpinner = true;
            //Datos del chofer
            this.traer_usuario(this.viaje.id_chofer, "chofer")
            .then(()=>{
                //Asignar marcadores
                this.origen_marker = ({
                  lat: this.viaje.origen_coord[0],
                  lng: this.viaje.origen_coord[1],
                  label: "Origen",
                  icon: "assets/imgs/marker_person.png",
                  draggable: false
                });
                this.destino_marker = ({
                  lat: this.viaje.destino_coord[0],
                  lng: this.viaje.destino_coord[1],
                  label: "Destino",
                  icon: "assets/imgs/marker_finish.png",
                  draggable: false
                });
                //Refrescar marcadores
                this.markers = [this.origen_marker, this.destino_marker];
                //Habilitar vistas
                this.mostrarMsjMedio = true;
                this.mostrarDatos_chofer = true;
                this.boton_pedir = false;
                this.mostrarMapa = true;
                this.boton_cancelar = true;
                this.boton_qr = true;
                this.mostrarPrecio = true;
            })
            break;
        // 3) VIAJE EN CURSO
            case "en curso":
            this.mostrarAlerta(this.texto.estados.en_curso);
            this.msj_estado = this.texto.estados.en_curso;
            this.mostrarSpinner = true;
            //Datos del chofer
            this.traer_usuario(this.viaje.id_chofer, "chofer")
            .then(()=>{
                //Asignar marcadores
                this.origen_marker = ({
                  lat: this.viaje.origen_coord[0],
                  lng: this.viaje.origen_coord[1],
                  label: "Origen",
                  icon: "assets/imgs/marker_person.png",
                  draggable: false
                });
                this.destino_marker = ({
                  lat: this.viaje.destino_coord[0],
                  lng: this.viaje.destino_coord[1],
                  label: "Destino",
                  icon: "assets/imgs/marker_finish.png",
                  draggable: false
                });
                //Refrescar marcadores
                this.markers = [this.origen_marker, this.destino_marker];
                //Habilitar vistas
                this.mostrarMsjMedio = true;
                this.mostrarDatos_chofer = true;
                this.boton_pedir = false;
                this.mostrarMapa = true;
                this.boton_cancelar = false;
                this.boton_qr = true;
                this.mostrarPrecio = true;
            })
            break;
        // 4) VIAJE CUMPLIDO
            case "cumplido":
            this.mostrarAlerta(this.texto.estados.cumplido);
            //this.msj_estado = this.texto.estados.cumplido;
            this.mostrarSpinner = true;
            //Datos del chofer
            this.traer_usuario(this.viaje.id_chofer, "chofer")
            .then(()=>{
              this.usuario.viajando = false;
              this._userService.modificar_usuario(this.usuario)
              .then(()=>{
                //Asignar marcadores
                this.origen_marker = ({
                  lat: this.viaje.origen_coord[0],
                  lng: this.viaje.origen_coord[1],
                  label: "Origen",
                  icon: "assets/imgs/marker_person.png",
                  draggable: false
                });
                this.destino_marker = ({
                  lat: this.viaje.destino_coord[0],
                  lng: this.viaje.destino_coord[1],
                  label: "Destino",
                  icon: "assets/imgs/marker_finish.png",
                  draggable: false
                });
                //Refrescar marcadores
                this.markers = [this.origen_marker, this.destino_marker];
                //Habilitar vistas
                this.mostrarMsjMedio = false;
                this.mostrarDatos_chofer = true;
                this.mostrarPrecio = true;
                this.boton_pedir = false;
                this.mostrarMapa = true;
                this.mostrarMsjFinal = true;
                this.boton_cancelar = false;
                this.boton_qr = true;
                this.mostrarSpinner = false;
              })
            })
            break;
        // 5) VIAJE CANCELADO POR SISTEMA
            case "cancelado":
            this.mostrarAlerta(this.texto.estados.cancelado_sistema);
            //this.msj_estado = this.texto.estados.cancelado_sistema;
            this.mostrarSpinner = true;
            this.usuario.viajando = false;
            this._userService.modificar_usuario(this.usuario)
            .then(()=>{
              //Habilitar vistas
              this.mostrarMsjMedio = false;
              this.boton_pedir = false;
              this.mostrarMapa = false;
              this.mostrarMsjFinal = false;
              this.boton_cancelar = false;
              this.boton_qr = false;
              this.mostrarDatos_chofer = false;
              this.generar_viaje_default();
              this.mostrarSpinner = false;
            })
            break;
          }//Fin del switch
      })//item
    })//observable
  }

  //DETENER PEDIDO DE VIAJE
  cancelar_viaje(){

    this._viajeService.baja_viaje(this.viaje.id_viaje)
      .then(()=>{
        this.usuario.viajando = false;
        this._userService.modificar_usuario(this.usuario)
          .then(()=>{
            this.generar_viaje_default();
            this.boton_qr = false;
            this.boton_cancelar = false;
            this.mostrarMapa = false;
            this.mostrarDatos_chofer = false;
            this.mostrarSpinner = false;
            this.mostrarAlerta(this.texto.estados.cancelado_cliente);
          })
      })
      .catch((error)=>{ console.log("Error al eliminar viaje: " + error); })
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
    this.navCtrl.push(PerfilPage, {'userSelected' : this.chofer, 'profile' : "cliente" });
  }

  ir_encuesta(){
    this.navCtrl.push(ClienteEncuestaPage, { 'id_viaje' : this.viaje.id_viaje, 'desde':'viaje' });
  }

}
