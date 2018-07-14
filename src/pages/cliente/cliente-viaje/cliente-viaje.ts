import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
//PAGINAS
import { MapaPage, PerfilPage, ClienteEncuestaPage } from '../../index-paginas';
//CLASES
import { Usuario } from '../../../classes/usuario';
import { Viaje } from '../../../classes/viaje';
//Interface MARKER
import { Marker } from '../../../interfaces/marker';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { QrServicioProvider } from '../../../providers/qr-servicio/qr-servicio';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { IdiomaProvider } from '../../../providers/idioma/idioma';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

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
  msj_estado:string;
  //VALORES QUE VARIAN (para mostrar)
  precioMostrar:number;
  distancia:number; //Para mostrar al usuario
  //SUSCRIBER
  clienteSuv:Subscription;
  viajeIniciado:boolean = false;
  //CALLBACK function (para retornar dirección/coordenadas desde MapaPage)
  myCallbackFunction:Function;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public navParams: NavParams,
              private _userService:UsuarioServicioProvider,
              private _authService:AuthServicioProvider,
              private _viajeService:ViajeServicio,
              private _qrScannerSrv: QrServicioProvider,
              private _utilitiesServ: UtilidadesProvider,
              private _idiomaSrv:IdiomaProvider,
              private platform:Platform) {

      //IDIOMA
      this.idioma = Idioma.es;
      this.mostrarSpinner = true;
      this.directionsService = new google.maps.DirectionsService();
      this.options = {
          suppressMarkers: true,
      };
  }
  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }

  //CARGAR IDIOMA
  cargar_idioma(){
      this._idiomaSrv.getLanguageFromStorage()
        .then((idioma)=>{
          this.idioma = idioma;
        })
  }

  ionViewDidLoad() {
    this.mostrarSpinner = true;
    this._idiomaSrv.getLanguageFromStorage()
      .then((idioma)=>{
        this.idioma = idioma;
        this.generar_fecha();
        let hora = this.hora.split(':');
        let horaActual = parseInt(hora[0]);
        //VALIDAR = NUEVA VIAJE vs VIAJE PROCESADO
        this.traer_usuario(this._authService.get_userUID(), "cliente")
          .then(()=>{
            this.viajeIniciado = false;
            this._viajeService.traer_un_viaje_actual(this.usuario.id_usuario, this.fecha, horaActual)
              .then((data:any)=>{
                if(data){
                  console.log("DATA: " + JSON.stringify(data));
                  this.viaje = data;
                  this.validar_espera();
                }
                else{
                  console.log("SIN VIAJE");
                  this.generar_viaje_default();
                  this.mostrarSpinner = false;
                }
              })
          })
        })

    //callBack para mapa
    this.myCallbackFunction = (datos)=> {
      console.log("callback asignado");
       return new Promise((resolve, reject) => {
            this.mostrarSpinner = true;
            // ORIGEN
            if(this.punto === 1){
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
            if(this.punto === 2){
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
            this.refrescar_mapa()
              .then(()=>{
                this.mostrarSpinner = false;
                resolve();
              })
           });
    }
  }

  //TRAER UN USUARIO
  traer_usuario(uid:string, usuario:string){
    this.mostrarSpinner = true;
    return this._userService.traerUsuario(uid)
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
      fecha:this.fecha,
      hora:this.hora,
      cod_fecha: new Date().valueOf().toString(),
      origen: "*****",
      origen_coord:[1,1],
      destino:"*****",
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
    this.fecha = currentDate.getFullYear()+'-'+(currentDate.getMonth()<10?'0':'').toString()+(currentDate.getMonth() + 1)+'-'+(currentDate.getDate()<10?'0':'').toString()+currentDate.getDate();
    console.log("Fecha: " + this.fecha);
    this.hora = (currentDate.getHours()<10?'0':'').toString() + currentDate.getHours().toString()+':'+ (currentDate.getMinutes()<10?'0':'').toString() +currentDate.getMinutes().toString();
    console.log("Hora: " + this.hora);
  }

  //REFRESCAR MAPA
  refrescar_mapa(){
  let promesa = new Promise((resolve, reject)=>{
      if(this.viaje.origen !== "*****" && this.viaje.destino !== "*****"){
        //Refrescar marcadores
        this.markers = [this.origen_marker, this.destino_marker];
        //Tomar distancia
        this.medir_distancia()
          .then(()=>{
        //Calcular costo
            this.calcular_precio()
              .then(()=>{
                //Mostrar mapa
                this.mostrarMapa = true;
                this.mostrarPrecio = true;
                this.boton_pedir = true;
                resolve();
              })
          })
          .catch((error)=>{ console.log("Error al calcular distancia: " + error); })
      }
      else
        resolve();
    });
    return promesa;
  }

  //MOSTRAR MAPA
  verMapa(opcion:number){
    this.punto = opcion;
    console.log("Punto seleccionado: " + this.punto);
    let mostrar_direccion:string = '*****';
    if(this.punto === 1)
      mostrar_direccion = this.viaje.origen;
    else
      mostrar_direccion = this.viaje.destino;

    this.navCtrl.push(MapaPage, {'direccion' : mostrar_direccion, 'callback':this.myCallbackFunction});
  }

  //CALCULAR PRECIO
  calcular_precio(){
    let promesa = new Promise((resolve, reject)=>{
      //Definir precio (a guardar)
      if(this.viaje.distancia * this.precio < this.precio_minimo){
        this.viaje.precio = this.precio_minimo;
      }
      else{
        this.viaje.precio = Math.round( this.viaje.distancia * this.precio);
      }
      //Definir precio (a mostrar)
      switch(this.idioma.code){
        case 'es':
        this.precioMostrar = this.viaje.precio; break;
        case 'en':
        this.precioMostrar = Math.round(this.viaje.precio / 27.22); break;
        case 'de':
        this.precioMostrar = Math.round(this.viaje.precio / 31.85); break;
        case 'ru':
        this.precioMostrar = Math.round(this.viaje.precio * 1.43);  break;
        case 'fr':
        this.precioMostrar = Math.round(this.viaje.precio / 31.85); break;
        case 'pt':
        this.precioMostrar = Math.round(this.viaje.precio / 7.08);  break;
      }
      resolve();
    });
    return promesa;
  }
  //MEDIR DISTANCIA CON DIRECTIONS
  medir_distancia(){

    let promesa = new Promise((resolve, reject)=>{
        let fijo:number;
        //Tomar distancia
        this.request_directions= {
          origin      : this.viaje.origen,
          destination : this.viaje.destino,
          travelMode  : 'DRIVING'
        };
        this.directionsService.route(this.request_directions, (response, status)=> {
          if ( status == google.maps.DirectionsStatus.OK ) {
            if(this.idioma.code !== 'en'){
              this.distancia = response.routes[0].legs[0].distance.value * 0.001; //En kilómetros
            }
            else{
              this.distancia = response.routes[0].legs[0].distance.value * 0.000621371//En millas
            }
            this.distancia = Math.round(this.distancia * 100) / 100//Para mostrar
            fijo = response.routes[0].legs[0].distance.value * 0.001;
            this.viaje.distancia = Math.round(fijo * 100) / 100; //Lo que en definitiva se guarda
            resolve();
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
    this.viajeIniciado = true;
    this.clienteSuv = this._viajeService.esperar_estado(this.viaje.id_viaje)
    .subscribe((viaje:any)=>{
      viaje.forEach((item) => {
          console.log("Estado del viaje: " + item.estado);
          this.viaje = item;
          switch(this.viaje.estado){
        // 1) VIAJE A LA ESPERA DE UN CHOFER
            case "pendiente":
            this._utilitiesServ.showToast(this.idioma.pag_viaje_cliente.estados.pendiente);
            this.msj_estado = this.idioma.pag_viaje_cliente.estados.pendiente;
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
            //Tomar distancia
            this.medir_distancia()
              .then(()=>{
            //Calcular costo
                this.calcular_precio()
                  .then(()=>{
                //Habilitar vistas
                this.mostrarMsjMedio = true;
                this.boton_pedir = false;
                this.mostrarMapa = true;
                this.boton_cancelar = true;
                this.mostrarPrecio = true;
                this.mostrarDatos_chofer = false;
              })
            })
            break;
        // 2) VIAJE TOMADO POR UN CHOFER
            case "tomado":
            this._utilitiesServ.showToast(this.idioma.pag_viaje_cliente.estados.tomado);
            this.msj_estado = this.idioma.pag_viaje_cliente.estados.tomado;
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
                this.medir_distancia()
                  .then(()=>{
                //Calcular costo
                  this.calcular_precio()
                    .then(()=>{
                //Habilitar vistas
                  this.mostrarMsjMedio = true;
                  this.mostrarDatos_chofer = true;
                  this.boton_pedir = false;
                  this.mostrarMapa = true;
                  this.boton_cancelar = true;
                  this.boton_qr = true;
                  this.mostrarPrecio = true;
                })
              })
            })
            break;
        // 3) VIAJE EN CURSO
            case "en curso":
            this._utilitiesServ.showToast(this.idioma.pag_viaje_cliente.estados.en_curso);
            this.msj_estado = this.idioma.pag_viaje_cliente.estados.en_curso;
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
                this.medir_distancia()
                  .then(()=>{
                //Calcular costo
                  this.calcular_precio()
                    .then(()=>{
                  //Habilitar vistas
                  this.mostrarMsjMedio = true;
                  this.mostrarDatos_chofer = true;
                  this.boton_pedir = false;
                  this.mostrarMapa = true;
                  this.boton_cancelar = false;
                  this.boton_qr = true;
                  this.mostrarPrecio = true;
                })
              })
            })
            break;
        // 4) VIAJE CUMPLIDO
            case "cumplido":
            this.clienteSuv.unsubscribe();
            this._utilitiesServ.showToast(this.idioma.pag_viaje_cliente.estados.cumplido);
            //this.msj_estado = this.idioma.pag_viaje_cliente.estados.cumplido;
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
            this._utilitiesServ.showToast(this.idioma.pag_viaje_cliente.estados.cancelado_sistema);
            //this.msj_estado = this.idioma.pag_viaje_cliente.estados.cancelado_sistema;
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
              this.mostrarPrecio = false;
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

    this.clienteSuv.unsubscribe();
    this.mostrarSpinner = true;
    this.viaje.estado = "cancelado";
    this._viajeService.modificar_viaje(this.viaje)
      .then(()=>{
        this.usuario.viajando = false;
        this._userService.modificar_usuario(this.usuario)
          .then(()=>{
            this.generar_viaje_default();
            this.boton_qr = false;
            this.boton_cancelar = false;
            this.mostrarMapa = false;
            this.mostrarDatos_chofer = false;
            this.mostrarPrecio = false;
            this.mostrarMsjMedio = false;
            this.mostrarSpinner = false;
            this._utilitiesServ.showWarningToast(this.idioma.pag_viaje_cliente.estados.cancelado_cliente);
          })
      })
      .catch((error)=>{ console.log("Error al cancelar viaje: " + error); })
  }

  //DIRECCIONAR
  direccionar(){
      //Validación para el navegador web (probar servicio)
      if(!this.platform.is('cordova')){
        this._utilitiesServ.showWarningToast(this.idioma.pag_qr.msj.navegador);//Existe el código y YA fue cargado
        return;
      }

      //LECTURA DE SCANNER QR
      this._qrScannerSrv.inicializar(this.idioma.pag_qr.msj);
      this._qrScannerSrv.lector_qr()
        .then((texto)=>{
          console.log("Texto capturado: " + texto);
          console.log("Id vehiculo del chofer: " + this.chofer.id_vehiculo);
          switch(texto){
            //QR PARA ENCUESTA
            case "encuesta_qr":
              if(this.viaje.estado == "cumplido")
                this.ir_encuesta();
              else
                this._utilitiesServ.showWarningToast(this.idioma.pag_qr.msj.inaccesible);
            break;
            //QR PARA DATOS DEL CHOFER
            case this.viaje.id_vehiculo.toString().trim():
              if(this.viaje.estado != "pendiente")
                this.ir_datos_chofer();
              else
                this._utilitiesServ.showWarningToast(this.idioma.pag_qr.msj.inaccesible);
            break;
            //QR DESCONOCIDO
            default:
            this._utilitiesServ.showErrorToast(this.idioma.pag_qr.msj.desconocido);
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

  ionViewWillLeave(){
    if(this.viajeIniciado)
      this.clienteSuv.unsubscribe();
  }

}
