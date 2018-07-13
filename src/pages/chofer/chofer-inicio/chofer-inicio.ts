import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
//FIREBASE
import * as firebase from 'firebase/app';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ChoferEncuestaPage,ChoferViajePage } from '../../../pages/index-paginas';
import { vehiculo } from '../../../classes/vehiculo.model';
import { Subscription } from 'rxjs/Subscription';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { QrServicioProvider } from '../../../providers/qr-servicio/qr-servicio';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@IonicPage()
@Component({
  selector: 'page-chofer-inicio',
  templateUrl: 'chofer-inicio.html',
})
export class ChoferInicioPage {
  //SPINNER
  mostrarSpinner:boolean = false;
  //DATOS
  usuarioSesion: any;
  vehiculos: any;
  vehiculoAsignado: any;
  chofer : any;
  viaje:any;

  //SUSCRIPCIONES
  usersSubs : Subscription;
  viajesSubs : Subscription;
  vehiculosSubs : Subscription;
  asignado: boolean = false;
  seBuscanViajes:boolean = false;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
    public utils: UtilidadesProvider,
    public vehiculosProv: VehiculosProvider,
    public userProv: UsuarioServicioProvider,
    public menu: MenuController,
    public viajesProv: ViajeServicio,
    private _qrScannerSrv: QrServicioProvider) {
    //IDIOMA
    this.cargar_idioma();
    this.mostrarSpinner = true;
    this.usuarioSesion = firebase.auth().currentUser;
  }
  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }
  //CARGAR IDIOMA
  cargar_idioma(){
    this.idioma = Idioma.es;
  }
  ionViewDidLoad(){
    this.inicializar();
  }

  //PRIMERA VALIDACION: chofer + viaje actual + auto asignado
  inicializar(){
    this.mostrarSpinner = true;
    this.usersSubs = this.userProv.getUsers().subscribe(
    lista => {

 //1) OBTENER CHOFER
        this.chofer = lista.filter(v => v.id_usuario == this.usuarioSesion.uid);
        console.log('this.chofer ',this.chofer);
//2) ¿HAY UN VIAJE ASIGNADO? (SUSCRIBER - a la espera de cambios)
            this.viajesSubs = this.viajesProv.getAllTrips().subscribe(
                lista => {
//3) OBTENER VIAJE
                this.seBuscanViajes = true;
                if(this.chofer[0].id_viaje != '' && this.chofer[0].id_viaje != null && this.chofer[0].id_vehiculo != '' && this.chofer[0].id_vehiculo != null){

                      this.viaje = lista.filter(v => v.id_viaje == this.chofer[0].id_viaje)[0];
                      console.log('this.viaje ',this.viaje);
  //4) VALIDAR ESTADO DEL VIAJE
                      if(this.viaje.estado != 'pendiente' && this.viaje.estado != 'cancelado' && this.viaje.estado != 'cumplido'){
                          this.viaje.id_vehiculo = this.chofer[0].id_vehiculo;
                          this.viajesProv.modificar_viaje(this.viaje)
                          .then(v =>{

                              this.utils.showToast(this.idioma.pag_inicio_chofer.mensaje.msj_1);
                              this.mostrarSpinner = false;
                              this.viajesSubs.unsubscribe();
                              this.navCtrl.push(ChoferViajePage,{viaje :this.viaje, chofer: this.chofer[0]});
                          })
                          .catch(error => console.log('error ',error))
                      }
                      //Chofer tiene vehiculo asignado + viaje asignado PERO es un viaje pasado
                      else{
                          this.mostrarSpinner = false;
                          this.navCtrl.push(ChoferEncuestaPage, { vehiculo: this.chofer[0].id_vehiculo, chofer: this.chofer[0].id_usuario, desdeInicio: true });
                      }
                  }
  //5) SIN VIAJE ASIGNADO: validar entonces sólo si tiene auto asignado.
                  else{
                    //CHOFER no tiene ningún viaje asignado pero sí vehiculo
                    if(this.chofer[0].id_vehiculo != null && this.chofer[0].id_vehiculo != ''){
                      this.mostrarSpinner = false;
                      this.navCtrl.push(ChoferEncuestaPage, { vehiculo: this.chofer[0].id_vehiculo, chofer: this.chofer[0].id_usuario, desdeInicio: true });
                    }
                    //CHOFER no tiene ningún viaje asignado ni tampoco vehículo
                    else
                      this.mostrarSpinner = false;
                  }
                },
                error => this.utils.showErrorToast(this.idioma.pag_inicio_chofer.mensaje.msj_3 + error.json())
            )
      },
      error => this.utils.showErrorToast(this.idioma.pag_inicio_chofer.mensaje.msj_3 + error.json())
    )
  }

  async comenzarActividad() {

    console.log('vehiculos', this.vehiculos);

    //ESCANEAR CÓDIGO QR DEL VEHICULO
    try {
      this.asignado = false;
      this._qrScannerSrv.inicializar(this.idioma.pag_qr.msj);
      this._qrScannerSrv.lector_qr()
      .then(texto => {
        this.vehiculosSubs = this.vehiculosProv.getListaVehiculos().subscribe(vehiculos => {
          const result = (vehiculos.filter(v => texto === v.vehiculo.patente && v.vehiculo.activo && !v.vehiculo.ocupado).length > 0);
          console.log(result);
          if (result) {
            const vehiculo = vehiculos.filter(v => texto == v.vehiculo.patente && v.vehiculo.activo && !v.vehiculo.ocupado)[0];
            console.log(vehiculos);
            vehiculo.vehiculo.ocupado = true;
            this.vehiculoAsignado = vehiculo;
            this.asignado = true;
            this.vehiculosProv.updateItem(vehiculo.key, vehiculo.vehiculo);
            this.asignarVehiculo();
          }
          else {
            this.vehiculosSubs.unsubscribe();
            console.log('this.vehiculoAsignado', this.vehiculoAsignado);
            this.utils.showWarningToast(this.idioma.pag_inicio_chofer.mensaje.msj_2);
          }
        });
        console.log('Barcode data', texto);
      });
    } catch (e) {
      console.log(e);
    }

    try {
      if (this.asignado) {
        this.menu.enable(false);
        await this.asignarVehiculo();
        this.vehiculoAsignado.vehiculo.ocupado = true;
        await this.actualizarDisponibilidad(this.vehiculoAsignado.key, this.vehiculoAsignado.vehiculo);
      }
    } catch (e) {
      this.utils.showErrorToast(this.idioma.pag_inicio_chofer.mensaje.msj_3 + e.message);
    }

  }

  asignarVehiculo() {
    this.userProv.asignarVehiculo(this.usuarioSesion.uid, this.vehiculoAsignado.vehiculo.patente);
  }
  //FALTA VER EN QUE MOMENTO SE LIBERA

  async actualizarDisponibilidad(key: string, vehiculo: vehiculo) {
    this.vehiculosProv.updateItem(key, vehiculo);
    this.utils.showToast(this.idioma.pag_inicio_chofer.mensaje.msj_4);
  }

  encuestaChofer() {
    this.navCtrl.push(ChoferEncuestaPage, { vehiculo: this.vehiculoAsignado.id_vehiculo, chofer: this.usuarioSesion.uid, desdeInicio: true });
  }

  ionViewWillLeave(){
    console.log("Se fue de chofer inicio");
    this.usersSubs.unsubscribe();
    if(this.asignado)
      this.vehiculosSubs.unsubscribe();
    if(this.seBuscanViajes)
      this.viajesSubs.unsubscribe();
  }

}
