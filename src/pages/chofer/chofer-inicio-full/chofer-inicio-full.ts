import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { ChoferEncuestaPage } from '../../index-paginas';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { patentes } from '../../../assets/data/textosQR';
import { barCodeScanTextES } from '../../../assets/data/textos';

/**
 * Generated class for the ChoferInicioFullPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chofer-inicio-full',
  templateUrl: 'chofer-inicio-full.html',
})
export class ChoferInicioFullPage {
  @ViewChild('slides') slidesRef: Slides;
  viaje: any;
  usuario: any;
  vehiculo: any;
  listaViajes: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private utilidades: UtilidadesProvider,
    private vehiculoSrv: VehiculosProvider,
    private usuarioSrv: UsuarioServicioProvider,
    private auth: AuthServicioProvider,
    private barcodeScanner: BarcodeScanner,
    private modalCtrl: ModalController,
    private viajeSrv: ViajeServicio) {
  }

  ionViewDidLoad() {
    this.usuarioSrv.traerUsuario(this.auth.get_userUID()).then((value: any) => {
      this.usuario = value;
      if (value.id_vehiculo === '') {
        // this.vehiculoSrv.getListaVehiculos().subscribe(next => {
        //   var vehiculos = next.filter(itemVehiculo => itemVehiculo.vehiculo.patente == value.id_vehiculo);
        //   // console.log(vehiculos,value,next);
        //   if(vehiculos.length > 0)
        //   {
        //     vehiculos[0].vehiculo.ocupado = true;
        //     this.vehiculoSrv.updateItem(vehiculos[0].key,vehiculos[0].vehiculo);
        //     value.id_vehiculo = vehiculos[0].vehiculo.patente;
        //     this.usuarioSrv.modificar_usuario(value);
        //   }
        // });
      }
      else {
        this.vehiculoSrv.getListaVehiculos().subscribe(next => {
          var vehiculos = next.filter(itemVehiculo => itemVehiculo.vehiculo.patente == value.id_vehiculo);
          // console.log(vehiculos,value,next);
          if (vehiculos.length > 0) {
            this.vehiculo = vehiculos[0];
            if (value.id_viaje && value.id_viaje !== '') {
              this.viajeSrv.getAllTrips().subscribe(next => {
                const viajes = next.filter(v => v.id_viaje == value.id_viaje);
                if (viajes.length > 0) {
                  //Ir a slide de viaje
                  this.viaje = viajes[0];
                }
              });
            }
            else {
              //Ir a la lista de viajes
              this.viajeSrv.getAllTrips().subscribe(next => {
                if (next.length > 0) {
                  //Ir a slide de viaje
                  this.listaViajes = next;
                }
              });
            }
          }
          else {
            //contactar con el administrador
          }
        })
      }
    });
  }

  public comenzarActividad() {
    const options = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      saveHistory: true, // Android, save scan history (default false)
      prompt: barCodeScanTextES, // Android
      resultDisplayDuration: 300, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      disableSuccessBeep: false // iOS and Android
    }
    this.barcodeScanner.scan(options).then(barcodeData => {
      const text: string = barcodeData.text;
      if (patentes.filter(value => value === text).length > 0) {
        this.vehiculoSrv.getListaVehiculos().subscribe(next => {
          var vehiculos = next.filter(itemVehiculo => itemVehiculo.vehiculo.patente == text);
          // console.log(vehiculos,value,next);
          if(vehiculos.length > 0)
          {
            vehiculos[0].vehiculo.ocupado = true;
            this.vehiculoSrv.updateItem(vehiculos[0].key,vehiculos[0].vehiculo);
            this.usuario.id_vehiculo = vehiculos[0].vehiculo.patente;
            this.usuarioSrv.modificar_usuario(this.usuario);
          }
          else{
            this.utilidades.showErrorToast("No hay un vehículo con esa patente");
          }
        });
        
      }
      else {
        //No es un codigo válido
        this.utilidades.showErrorToast("No es un codigo valido");
      }

    }).catch(err => {
      console.log('Error', err);
    });

  }


  public presentModal() {
    const modal = this.modalCtrl.create(ChoferEncuestaPage, { chofer: this.usuario, vehiculo: this.vehiculo });
    modal.present();
  }


}
