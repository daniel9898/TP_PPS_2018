import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { QrServicioProvider } from '../../../providers/qr-servicio/qr-servicio';
import { patentes } from '../../../assets/data/textosQR';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { SupervisorEncuestaPage } from '../../index-paginas';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@IonicPage()
@Component({
  selector: 'page-supervisor-inicio',
  templateUrl: 'supervisor-inicio.html',
})
export class SupervisorInicioPage {

  user_perfil: any;
  user_photo: any;
  //TEXTO
  idioma:any;
  // Doughnut
  public doughnutChartLabels: string[];
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
  public barChartLabels: string[];
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
    private _qrScannerSrv: QrServicioProvider,
    private utilidades: UtilidadesProvider) {
    //IDIOMA
    this.cargar_idioma();
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
  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
    this.doughnutChartLabels = [ this.idioma.pag_inicio_supervisor.valores_chofer[1],
                                 this.idioma.pag_inicio_supervisor.valores_chofer[2] ];
    this.barChartLabels = [this.idioma.pag_inicio_supervisor.valores_viaje[1],
                           this.idioma.pag_inicio_supervisor.valores_viaje[2],
                           this.idioma.pag_inicio_supervisor.valores_viaje[3],
                           this.idioma.pag_inicio_supervisor.valores_viaje[4] ];
  }
  //CARGAR IDIOMA
  cargar_idioma(){
    this.idioma = Idioma.es;
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

  //LECTURA CODIGO QR
  scanCode() {
    this._qrScannerSrv.inicializar(this.idioma.pag_qr.msj);
    this._qrScannerSrv.lector_qr()
    .then(texto => {
      if (patentes.filter(value => value === texto).length > 0) {
        if (this.choferesDisponibles.filter(c => c.id_vehiculo === texto).length > 0) {
          const chofer = this.choferesDisponibles.filter(c => c.id_vehiculo === texto)[0];
          this.navCtrl.push(SupervisorEncuestaPage, { chofer: chofer });
        }
        else {
          //No hay choferes diponibles
          this.utilidades.showWarningToast(this.idioma.pag_inicio_supervisor.mensaje.msj_1);
        }
      }
      else {
        //No es un codigo válido
        this.utilidades.showErrorToast(this.idioma.pag_inicio_supervisor.mensaje.msj_2);
      }

    }).catch(err => {
      console.log('Error', err);
    });

  }

}
