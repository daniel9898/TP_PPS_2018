import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
//jQUERY
import * as $ from 'jquery';
//PAGES
import {
  LoginPage, PerfilPage,
  ClienteInicioPage, ClienteViajePage, ClienteHistorialPage, ClienteEncuestasPage, ClienteEstadisticaPage, //-----------------------------CLIENTE
  ChoferInicioPage, ChoferViajePage, ChoferHistorialPage, ChoferEncuestaPage, ListaViajesPage, ChoferEstadisticaPage,//-------------------CHOFER
  SupervisorInicioPage, SupervisorListaUsuariosPage, SupervisorListaVehiculosPage
} from '../pages/index-paginas';//------------------------SUPERVISOR
import { SupervisorViajesReservasPage } from '../pages/supervisor/supervisor-viajes-reservas/supervisor-viajes-reservas';
import { ClienteReservasPage } from '../pages/cliente/cliente-reservas/cliente-reservas';
//CLASE
import { Usuario } from '../classes/usuario';
//SERVICIOS
import { AuthServicioProvider } from '../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../providers/usuario-servicio/usuario-servicio';
import { VehiculosProvider } from '../providers/vehiculos/vehiculos';
import { SonidosProvider } from '../providers/sonidos/sonidos';
import { ThemeSettingsProvider } from '../providers/theme-settings/theme-settings';
import { ConfiguracionesPage } from '../pages/comunes/configuraciones/configuraciones';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  mostrarSplash: boolean = true;
  pagesApp: Array<{ title: string, component: any, visibility: boolean }>;
  usuarioSesion: boolean;
  usuario: Usuario;
  sound: boolean = false;
  //Variables para control de vistas
  vista_cliente: boolean = false;
  vista_chofer: boolean = false;
  vista_supervisor: boolean = false;
  selectedTheme: String;
  
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu: MenuController,
    public auth: AuthServicioProvider,
    public usuarioSrv: UsuarioServicioProvider,
    public vehiculoSrv: VehiculosProvider,
    public _soundsServ: SonidosProvider,
    private colorSettings: ThemeSettingsProvider) {

    this.inicializarApp();

  }

  inicializarApp() {

    this.platform.ready().then(() => {
      this.colorSettings.getActiveTheme().subscribe(val => {
        this.selectedTheme = val;
      console.log(val);
    });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => {
        $('.splashScreen').addClass('animated fadeOutUp');
        let sound = this._soundsServ.get_soundCar();
        this._soundsServ.reproducirSonido(sound);
      });

    });

    this.auth.afAuth.user
      .subscribe(
        user => {
          if (user) {
            this.usuario_db();
            this.menu.enable(true);
            console.log("USUARIO EN APP: " + JSON.stringify(user));
            switch (user.displayName) {
              case "cliente":
                this.vista_cliente = true;
                this.vista_chofer = false;
                this.vista_supervisor = false;
                this.rootPage = ClienteInicioPage;
                break;
              case "chofer":
                this.vista_cliente = false;
                this.vista_chofer = true;
                this.vista_supervisor = false;
                this.rootPage = ChoferInicioPage;
                break;
              case "supervisor":
              case "superusuario":
                this.vista_cliente = false;
                this.vista_chofer = false;
                this.vista_supervisor = true;
                this.rootPage = SupervisorInicioPage;
                break;
            }

            this.pagesApp = [
              //PAGINAS CLIENTE (7)
              { title: 'Inicio', component: ClienteInicioPage, visibility: this.vista_cliente },
              { title: 'Perfil', component: PerfilPage, visibility: this.vista_cliente },
              { title: 'Viaje', component: ClienteViajePage, visibility: this.vista_cliente },
              { title: 'Reservas', component: ClienteReservasPage, visibility: this.vista_cliente },
              { title: 'Historial', component: ClienteHistorialPage, visibility: this.vista_cliente },
              { title: 'Estadística', component: ClienteEstadisticaPage, visibility: this.vista_cliente },
              { title: 'Encuestas pendientes', component: ClienteEncuestasPage, visibility: this.vista_cliente },
              { title: 'Configuración', component: ConfiguracionesPage, visibility: this.vista_cliente },
              //PAGINAS CHOFER (6)
              { title: 'Inicio', component: ChoferInicioPage, visibility: this.vista_chofer },
              { title: 'Perfil', component: PerfilPage, visibility: this.vista_chofer },
              { title: 'Pedir viaje', component: ClienteViajePage, visibility: this.vista_chofer },
              { title: 'Viaje en Curso', component: ChoferViajePage, visibility: this.vista_chofer },
              { title: 'Ganancias', component: ChoferHistorialPage, visibility: this.vista_chofer },
              { title: 'Viajes pedidos', component: ClienteHistorialPage, visibility: this.vista_chofer },
              { title: 'Estadística', component: ChoferEstadisticaPage, visibility: this.vista_chofer },
              { title: 'Encuesta', component: ChoferEncuestaPage, visibility: this.vista_chofer },
              { title: 'Reservas Pendientes', component: ListaViajesPage, visibility: this.vista_chofer },
              { title: 'Encuestas pendientes', component: ClienteEncuestasPage, visibility: this.vista_chofer },
              { title: 'Configuración', component: ConfiguracionesPage, visibility: this.vista_chofer },
              //PAGINAS SUPERVISOR (11)
              { title: 'Inicio', component: SupervisorInicioPage, visibility: this.vista_supervisor },
              { title: 'Perfil', component: PerfilPage, visibility: this.vista_supervisor },
              { title: 'Pedir viaje', component: ClienteViajePage, visibility: this.vista_supervisor },
              { title: 'Reservas', component: ClienteReservasPage, visibility: this.vista_supervisor },
              { title: 'Mi historial', component: ClienteHistorialPage, visibility: this.vista_supervisor },
              { title: 'Estadística', component: ClienteEstadisticaPage, visibility: this.vista_supervisor },
              { title: 'Lista usuarios', component: SupervisorListaUsuariosPage, visibility: this.vista_supervisor },
              { title: 'Lista vehiculos', component: SupervisorListaVehiculosPage, visibility: this.vista_supervisor },
              { title: 'Encuestas pendientes', component: ClienteEncuestasPage, visibility: this.vista_supervisor },
              { title: 'Viajes/Reservas', component: SupervisorViajesReservasPage, visibility: this.vista_supervisor },
              { title: 'Configuración', component: ConfiguracionesPage, visibility: this.vista_supervisor },
            ];

          } else {
            //Variables para control de vistas
            this.pagesApp = [];
            this.menu.enable(false);
            this.rootPage = LoginPage;
          }
        },
        () => {
          //Variables para control de vistas
          this.pagesApp = [];
          this.menu.enable(false);
          this.rootPage = LoginPage;
        }
      );
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  usuario_db() {
    if (this.auth.authenticated_2) {
      this.usuarioSrv.traerUsuario(this.auth.get_userUID_2())
        .then((user: any) => {
          this.usuario = user;
          this.sound = this.usuario.sonido;
          console.log("USUARIO DB: " + this.usuario);
        })
        .catch((error) => { console.log("Error al traer usuario: " + error) })
    }
  }

  sonido() {
    if (this.usuario.sonido) {
      this.usuario.sonido = false;
      this.sound = false;
    }
    else {
      this.usuario.sonido = true;
      this.sound = true;
    }
    this.usuarioSrv.modificar_usuario(this.usuario)
  }

  logout() {
    this.menu.close();
    this.menu.enable(false);
    if (this.vista_chofer) {
      this.usuarioSrv.traerUsuario(this.auth.get_userUID_2()).then((value: any) => {
        if (value.id_vehiculo !== '') {
          this.vehiculoSrv.getListaVehiculos().subscribe(next => {
            var vehiculos = next.filter(itemVehiculo => itemVehiculo.vehiculo.patente == value.id_vehiculo);
            // console.log(vehiculos,value,next);
            if (vehiculos.length > 0) {
              vehiculos[0].vehiculo.ocupado = false;
              this.vehiculoSrv.updateItem(vehiculos[0].key, vehiculos[0].vehiculo);
              value.id_vehiculo = '';
              this.usuarioSrv.modificar_usuario(value);
            }
          });
        }
      });
    }
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }



}
