import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../../classes/usuario';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { Viaje } from '../../../classes/viaje.model';
import { SupervisorAsignaViajePage } from '../supervisor-asigna-viaje/supervisor-asigna-viaje';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';
import { IdiomaProvider } from '../../../providers/idioma/idioma';

@IonicPage()
@Component({
  selector: 'page-supervisor-choferes-disponibles',
  templateUrl: 'supervisor-choferes-disponibles.html',
})
export class SupervisorChoferesDisponiblesPage {

  mostrarSpinner: boolean = false;
  usuarios: Usuario[] = [];
  viaje: Viaje
  esReserva: boolean = false;
  //TEXTO
  idioma:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuarioServicio: UsuarioServicioProvider,
    private _idiomaSrv: IdiomaProvider) {

    //IDIOMA
    this.idioma = Idioma.es;
    if (this.navParams.data.viaje !== null) {
      this.viaje = this.navParams.data.viaje;
      this.esReserva = this.navParams.data.esReserva;
      console.log(this.viaje);
    }
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
    console.log('SupervisorChoferesDisponiblesPage página cargada');
    this._usuarioServicio.getUsers().subscribe(next => {
      this.usuarios = next.filter(usr => usr.perfil == 'chofer' && usr.id_vehiculo && usr.id_vehiculo.length > 0 && usr.activo && !usr.viajando);
      console.log(next);
    });
  }

/**
 * ir a pantalla de asignación de viaje
 */
  asignarViaje(index) {
    const chofer = this.usuarios[index];
    this.navCtrl.push(SupervisorAsignaViajePage,{ viaje: this.viaje, chofer: chofer, esReserva: this.esReserva });
  }

}
