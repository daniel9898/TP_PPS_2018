import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { barCodeScanTextES } from '../../../assets/data/textos';
import { patentes } from '../../../assets/data/textosQR';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';

@IonicPage()
@Component({
  selector: 'page-supervisor-inicio',
  templateUrl: 'supervisor-inicio.html',
})
export class SupervisorInicioPage {

  user_perfil: any;
  user_photo: any;

  // Doughnut
  public doughnutChartLabels: string[] = ['Disponibles', 'No disponibles'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';
  public options: any = {
    legend: {
      display: true,
      position: 'top',
      fullWidth: true
    },
    padding: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0
    },
    responsive: true,
    maintainAspectRatio: false
  };
  // END DONUT CHART
  // START BAR CHART
  public barChartOptions: any = {
    legend: {
      display: false,
    },
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabels: string[] = ['pendiente', 'cancelado', 'en curso', 'cumplido'];
  public barChartData: any[] = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  choferesDisponibles: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthServicioProvider,
    private usuarioSrv: UsuarioServicioProvider,
    private viajesSrv: ViajeServicio,
    private barcodeScanner: BarcodeScanner,
    private utilidades: UtilidadesProvider) {

    this.user_perfil = this._auth.get_userProfile();
    this.user_photo = this._auth.get_userPhoto();
    console.log("Usuario actual: " + this.user_perfil);
    this.viajesSrv.getAllTrips().subscribe(next => {
      const pendientes = next.filter(viaje => viaje.estado === 'pendiente').length;
      const cancelados = next.filter(viaje => viaje.estado === 'cancelado').length;
      const enCurso = next.filter(viaje => viaje.estado === 'en curso').length;
      const cumplido = next.filter(viaje => viaje.estado === 'cumplido').length;
      this.barChartData = [
        { x: 'pendientes', y: pendientes },
        { x: 'cancelados', y: cancelados },
        { x: 'En curso', y: enCurso },
        { x: 'cumplidos', y: cumplido }
      ];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorInicioPage');
    this.usuarioSrv.getUsers().subscribe(next => {
      const disponibles = next.filter(usr => usr.perfil == 'chofer' && usr.id_vehiculo && usr.id_vehiculo.length > 0 && usr.activo && !usr.viajando).length;
      this.choferesDisponibles = next.filter(usr => usr.perfil == 'chofer' && usr.id_vehiculo && usr.id_vehiculo.length > 0 && usr.activo && !usr.viajando);
      const v = next.filter(usr => usr.perfil == 'chofer' && usr.activo).length;
      this.doughnutChartData = [disponibles, v]
    });

  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  scanCode() {
    var options = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      saveHistory: true, // Android, save scan history (default false)
      prompt: barCodeScanTextES, // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      disableSuccessBeep: false // iOS and Android
    }
    this.barcodeScanner.scan(options).then(barcodeData => {
      const text:string = barcodeData.text;
      if(patentes.filter(value => value === text).length > 0){
        if(this.choferesDisponibles.filter(c => c.id_vehiculo === text).length > 0){

        }
        else {
          //No hay choferes diponibles

        }
      }
      else{
        //No es un codigo válido
        this.utilidades.showErrorToast("No es un codigo valido");
      }
      
    }).catch(err => {
      console.log('Error', err);
    });

  }

}
