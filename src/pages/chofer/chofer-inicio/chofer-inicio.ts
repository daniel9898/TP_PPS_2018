import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
//FIREBASE
import * as firebase from 'firebase/app';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ChoferEncuestaPage,ChoferViajePage } from '../../../pages/index-paginas';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { vehiculo } from '../../../classes/vehiculo.model';
import { Subscription } from 'rxjs/Subscription';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';

@IonicPage()
@Component({
  selector: 'page-chofer-inicio',
  templateUrl: 'chofer-inicio.html',
})
export class ChoferInicioPage {

  usuarioSesion: any;
  asignado: boolean;
  vehiculos: any;
  vehiculoAsignado: any;
  chofer : any;
  viaje:any;

  vehiculosSubs : Subscription;
  usersSubs : Subscription;
  viajesSubs : Subscription;

  constructor(public navCtrl: NavController,
    public utils: UtilidadesProvider,
    public vehiculosProv: VehiculosProvider,
    public userProv: UsuarioServicioProvider,
    private barcodeScanner: BarcodeScanner,
    public menu: MenuController,
    public viajesProv: ViajeServicio) {

    this.usuarioSesion = firebase.auth().currentUser;

    /*this.vehiculosSubs = this.vehiculosProv.getListaVehiculos().subscribe(
      lista => this.vehiculos = lista,
      error => this.utils.showErrorToast('Atención ! ' + error.json())
    )*/

    this.usersSubs = this.userProv.getUsers().subscribe(
      lista => {
        this.chofer = lista.filter(v => v.id_usuario == this.usuarioSesion.uid);
        console.log('this.chofer ',this.chofer);

        if(this.chofer[0].id_viaje != ''){

            this.viajesSubs = this.viajesProv.getAllTrips().subscribe(
                lista => {
                    this.viaje = lista.filter(v => v.id_viaje == this.chofer[0].id_viaje)[0];
                    console.log('this.viaje ',this.viaje);
                    this.utils.showToast('Tiene un viaje Asignado !!');
                    this.navCtrl.push(ChoferViajePage,{viaje :this.viaje});
      
                },
                error => this.utils.showErrorToast('Atención ! ' + error.json())
            )
        }
      },
      error => this.utils.showErrorToast('Atención ! ' + error.json())
    )


  }

  async comenzarActividad() {

    console.log('vehiculos', this.vehiculos);

    try {
      this.asignado = false;
      this.barcodeScanner.scan().then(value => {
        this.viajesSubs = this.vehiculosProv.getListaVehiculos().subscribe(vehiculos => {
          const result = (vehiculos.filter(v => value.text === v.vehiculo.patente && v.vehiculo.activo && !v.vehiculo.ocupado).length > 0);
          console.log(result);
          if (result) {
            const vehiculo = vehiculos.filter(v => value.text == v.vehiculo.patente && v.vehiculo.activo && !v.vehiculo.ocupado)[0];
            console.log(vehiculos);
            vehiculo.vehiculo.ocupado = true;
            this.vehiculoAsignado = vehiculo;
            this.asignado = true;
            this.vehiculosProv.updateItem(vehiculo.key, vehiculo.vehiculo);
            this.asignarVehiculo();
            //this.viajesSubs.unsubscribe();
          }
          else {
            this.viajesSubs.unsubscribe();
            console.log('this.vehiculoAsignado', this.vehiculoAsignado);
            this.utils.showWarningToast('Atención ! Vehiculo no disponible o codigo incorrecto, reintente.');
          }
        });
        console.log('Barcode data', value);
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
      this.utils.showErrorToast('Atención : ' + e.message);
    }

  }

  asignarVehiculo() {
    this.userProv.asignarVehiculo(this.usuarioSesion.uid, this.vehiculoAsignado.vehiculo.patente);
  }
  //FALTA VER EN QUE MOMENTO SE LIBERA 

  async actualizarDisponibilidad(key: string, vehiculo: vehiculo) {
    this.vehiculosProv.updateItem(key, vehiculo);
    this.utils.showToast('Vehiculo Asignado correctamente !', 'success');
  }

  listadoDeViajes() {
    //this.navCtrl.setRoot(ListaViajesPage);
    this.navCtrl.push(ChoferEncuestaPage, { vehiculo: this.vehiculoAsignado, chofer: this.usuarioSesion });
  }

  ionViewWillLeave(){
    console.log("se ejecuto ionViewWillLeave");
    //this.vehiculosSubs.unsubscribe();
    this.usersSubs.unsubscribe();
    this.viajesSubs.unsubscribe();
  
  }

}
