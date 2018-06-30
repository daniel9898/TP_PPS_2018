import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';

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
    legend: false,
    padding: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0
    }
  };

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _auth: AuthServicioProvider,
    public usuarioSrv: UsuarioServicioProvider,
    public viajesSrv: ViajeServicio) {

    this.user_perfil = this._auth.get_userProfile();
    this.user_photo = this._auth.get_userPhoto();
    console.log("Usuario actual: " + this.user_perfil);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorInicioPage');
    this.usuarioSrv.getUsers().subscribe(next =>{
      const disponibles = next.filter(usr => usr.perfil == 'chofer' && usr.id_vehiculo && usr.id_vehiculo.length > 0 && usr.activo && !usr.viajando).length;
      const v = next.filter(usr => usr.perfil == 'chofer' &&  usr.activo).length;
      this.doughnutChartData = [disponibles,v]
    });
  }

}
