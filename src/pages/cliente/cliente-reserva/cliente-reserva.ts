import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { MapaPage } from '../../index-paginas';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { Usuario } from '../../../classes/usuario';
import { Reserva } from '../../../classes/viaje.model';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { DirectionsRenderer } from '@ngui/map';
import { IdiomaProvider } from '../../../providers/idioma/idioma';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@Component({
  selector: 'page-cliente-reserva',
  templateUrl: 'cliente-reserva.html',
})
export class ClienteReservaPage {
  //Nombres de meses y días para el date picker
  monthNames: string[];
  monthShortNames: string[];
  daysNames: string[];
  daysShortNames: string[];
  myOriginCallbackFunction: Function;
  myDestCallbackFunction: Function;
  usuario: Usuario;
  reserva: Reserva;
  fecha:string;
  hora:string;
    /**
   * key de la base
   */
  key: any = '';
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsResult: google.maps.DirectionsResult;
  direction: any = {
    origin: '',
    destination: '',
    travelMode: 'DRIVING'
  };
  coordenadas: string;
  //TEXTO
  idioma:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateTimeSrv: DateTimeProvider,
    private auth: AuthServicioProvider,
    private usuarioServicio: UsuarioServicioProvider,
    private reservasSrv : ReservasProvider,
    private cdr: ChangeDetectorRef,
    private _utilitiesServ:UtilidadesProvider,
    private _idiomaSrv: IdiomaProvider) {

    //IDIOMA
    this.idioma = Idioma.es;
    this.fecha = dateTimeSrv.getDate();
    console.log("Fecha actual: " + this.fecha);
    this.hora = dateTimeSrv.getHour();
    console.log("Hora actual: " + this.hora);
    this.inicializarReserva();
  }

  /**
   * Inicializa la reserva
   */
  private inicializarReserva() {
    this.reserva = new Reserva();
    this.reserva.origen_coord = [];
    this.reserva.destino_coord = [];
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
          this.dateTimeSrv.initialized(this.idioma.code);
          this.monthNames = this.dateTimeSrv.getMonthNames();
          this.daysNames = this.dateTimeSrv.getWeekDays();
          this.daysShortNames = this.dateTimeSrv.getWeekDaysShort();
          this.monthShortNames = this.dateTimeSrv.getMonthNamesShort();
        })
  }

  /**
   * ion View Did Load
   */
  ionViewDidLoad() {
    this.directionsRendererDirective['initialized$'].subscribe( directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
      // this.directionsRenderer.setDirections(this.direction);
    });
    if (this.navParams.data.reserva) {
      this.reserva = this.navParams.data.reserva;
      this.direction.origin = this.navParams.data.reserva.origen;
      this.direction.destination = this.navParams.data.reserva.destino;
      this.coordenadas = `${this.navParams.data.reserva.destino_coord[0]},${this.navParams.data.reserva.destino_coord[1]}`;
      this.key = this.navParams.data.key;
    }
    this.myOriginCallbackFunction = (_params) => {
      console.log("callback asignado");
      return new Promise((resolve, reject) => {
        this.reserva.origen = _params.direccion;
        //cambiar el tipo de coordinadas en el merge
        this.setTripOriginCoord([_params.lat,_params.lng], this.reserva);
        // this.geo.obtenerCoordenadas(_params).then(coord => {
        //   this.setTripOriginCoord(coord, this.reserva);
        // });
        resolve();
      });
    }
    this.myDestCallbackFunction = (_params) => {
      console.log("callback asignado");
      return new Promise((resolve, reject) => {
        this.reserva.destino = _params.direccion;
        this.setTripDestCoord([_params.lat,_params.lng], this.reserva);
        // this.geo.obtenerCoordenadas(_params).then(coord => {
        //   this.setTripDestCoord(coord, this.reserva);
        // });
        resolve();
      });
    }
  }


  directionsChanged() {
    this.directionsResult = this.directionsRenderer.getDirections();
    this.cdr.detectChanges();
  }

  /**
   * ion view can enter
   */
  ionViewCanEnter() {
    this.loadUser();
  }

  /**
   * Metodo que carga el usuario
   */
  loadUser() {
    this.usuarioServicio.traer_un_usuario(this.auth.get_userUID())
      .then((user: any) => {
        //console.log("USUARIO: " + JSON.stringify(user));
        this.usuario = user;
        console.log(user);
      })
      .catch((error) => {
        // this.mostrarSpinner = false;
        console.log("Ocurrió un error al traer un usuario!: " + JSON.stringify(error));
      })
  }

  /**
   * Actualizar las coordenadas del viaje
   * @param coords coordenadas obtenidas
   * @param coordToUpdate coordenadas que se van a actualizar
   */
  setTripCoord(coords: number[], coordToUpdate: number[]) {
    coordToUpdate = coords;
    console.log(this.reserva, coordToUpdate);
  }

  /**
   * Establecer coordenadas origen
   * @param coordenadas coordenadas a establecer
   * @param reserva instancia de la reserva
   */
  setTripOriginCoord(coordenadas: number[], reserva: Reserva) {
    reserva.origen_coord = coordenadas;
    this.direction.origin = reserva.origen;
    this.directionsRendererDirective['showDirections'](this.direction);
    console.log(coordenadas, this.reserva, reserva);
  }


  /**
   * Establecer coordenadas destino
   * @param coordenadas coordenadas a establecer
   * @param reserva instancia de la reserva
   */
  setTripDestCoord(coordenadas: number[], reserva: Reserva) {
    reserva.destino_coord = coordenadas;
    this.reserva = reserva;
    this.direction.destination = reserva.destino;
    this.directionsRendererDirective['showDirections'](this.direction);
    console.log(coordenadas, this.reserva, reserva);
  }

  /**
   * Metodo para establecer la dirección
   * sin tener problemas con el scope.
   * @param dir dirección
   */
  public setDir(dir) {
    this.reserva.origen = dir;
  }

  /**
   * Setea la dirección de origen
   */
  setOriginDir() {
    this.navCtrl.push(MapaPage, { 'direccion': this.reserva.origen, 'callback': this.myOriginCallbackFunction });
  }

  /**
   * Setea la dirección de destino
   */
  setDestDir() {
    this.navCtrl.push(MapaPage, { 'direccion': this.reserva.destino, 'callback': this.myDestCallbackFunction });
  }
  /**
   * guardar reserva
   */
  guardarReserva(){
    const fecha = new Date(this.reserva.fecha);
    //se setean los datos para guardar
    this.reserva.cod_fecha = fecha.valueOf().toString();
    this.reserva.id_cliente = this.usuario.id_usuario;
    this.reserva.email = this.usuario.correo;
    console.log(this.reserva);
    // this.reservasSrv.addItem(this.reserva);
    if (this.key == '') {
      this.reservasSrv.addItem(this.reserva);
    } else if (this.key !== '') {
      this.reservasSrv.updateItem(this.key, this.reserva);
    }
    this._utilitiesServ.showToast(this.idioma.pag_reserva_cliente.mensaje);
    this.navCtrl.pop();
  }
}
