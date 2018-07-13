import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
//jQUERY
import * as $ from 'jquery';
//PAGES
import { LoginPage, PerfilPage,
         ClienteInicioPage, ClienteViajePage, ClienteHistorialPage, ClienteEncuestasPage, ClienteEstadisticaPage, //-----------------------------CLIENTE
         ChoferInicioPage, ChoferHistorialPage, ChoferEstadisticaPage,//--------------------------------------------------------CHOFER
         SupervisorInicioPage,SupervisorListaUsuariosPage, SupervisorListaVehiculosPage} from '../pages/index-paginas';//------------------------SUPERVISOR
import { SupervisorViajesReservasPage } from '../pages/supervisor/supervisor-viajes-reservas/supervisor-viajes-reservas';
import { ClienteReservasPage } from '../pages/cliente/cliente-reservas/cliente-reservas';
import { ConfigPage } from '../pages/config/config';
//CLASE
import { Usuario } from '../classes/usuario';
//SERVICIOS
import { AuthServicioProvider } from '../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../providers/usuario-servicio/usuario-servicio';
import { VehiculosProvider } from '../providers/vehiculos/vehiculos';
import { SonidosProvider } from '../providers/sonidos/sonidos';
//IDIOMA
import { Idioma } from '../assets/data/idioma/es';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  mostrarSplash:boolean = true;
  pagesApp: Array<{title: string, component: any, visibility: boolean}>;
  pageConfig:any;
  usuarioSesion:boolean;
  usuario:Usuario;
  sound:boolean = false;
  //Variables para control de vistas
  vista_cliente:boolean = false;
  vista_chofer:boolean = false;
  vista_supervisor:boolean = false;
  //TEXTO
  idioma:any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController,
              public auth: AuthServicioProvider,
              public usuarioSrv: UsuarioServicioProvider,
              public vehiculoSrv: VehiculosProvider,
              public _soundsServ:SonidosProvider) {
      //IDIOMA
      this.cargar_idioma();
      this.inicializarApp();

  }

  //CARGAR IDIOMA
  cargar_idioma(){
    this.idioma = Idioma.es;
  }

  inicializarApp(){

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(()=> {
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
          this.cargar_idioma();
          this.menu.enable(true);
          console.log("USUARIO EN APP: " + JSON.stringify(user));
          switch(user.displayName){
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
          this.pageConfig = { title: "Configuración", component: ConfigPage, visibility: false };
          this.pagesApp = [
            //PAGINAS CLIENTE (7)
            { title: this.idioma.pag_menu.opcion[1], component: ClienteInicioPage, visibility: this.vista_cliente },
            { title: this.idioma.pag_menu.opcion[2], component: PerfilPage, visibility: this.vista_cliente },
            { title: this.idioma.pag_menu.opcion[3], component: ClienteViajePage, visibility: this.vista_cliente },
            { title: this.idioma.pag_menu.opcion[4], component: ClienteReservasPage, visibility: this.vista_cliente },
            { title: this.idioma.pag_menu.opcion[5], component: ClienteHistorialPage, visibility: this.vista_cliente },
            { title: this.idioma.pag_menu.opcion[6], component: ClienteEstadisticaPage, visibility: this.vista_cliente },
            { title: this.idioma.pag_menu.opcion[7], component: ClienteEncuestasPage, visibility: this.vista_cliente },
            //PAGINAS CHOFER (8)
            { title: this.idioma.pag_menu.opcion[1], component: ChoferInicioPage, visibility: this.vista_chofer },
            { title: this.idioma.pag_menu.opcion[2], component: PerfilPage, visibility: this.vista_chofer },
            { title: this.idioma.pag_menu.opcion[3], component: ClienteViajePage, visibility: this.vista_chofer },
            { title: this.idioma.pag_menu.opcion[4], component: ClienteReservasPage, visibility: this.vista_chofer },
            { title: this.idioma.pag_menu.opcion[5], component: ClienteHistorialPage, visibility: this.vista_chofer },
            { title: this.idioma.pag_menu.opcion[6], component: ChoferEstadisticaPage, visibility: this.vista_chofer },
            { title: this.idioma.pag_menu.opcion[7], component: ClienteEncuestasPage, visibility: this.vista_chofer },
            { title: this.idioma.pag_menu.opcion[8], component: ChoferHistorialPage, visibility: this.vista_chofer },
            //PAGINAS SUPERVISOR (10)
            { title: this.idioma.pag_menu.opcion[1], component: SupervisorInicioPage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[2], component: PerfilPage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[3], component: ClienteViajePage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[4], component: ClienteReservasPage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[5], component: ClienteHistorialPage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[6], component: ClienteEstadisticaPage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[7], component: ClienteEncuestasPage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[9], component: SupervisorListaUsuariosPage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[10], component: SupervisorListaVehiculosPage, visibility: this.vista_supervisor },
            { title: this.idioma.pag_menu.opcion[11], component: SupervisorViajesReservasPage, visibility: this.vista_supervisor },
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

  usuario_db(){
    if(this.auth.authenticated_2){
      this.usuarioSrv.traerUsuario(this.auth.get_userUID_2())
        .then((user:any)=>{
          this.usuario = user;
          this.sound = this.usuario.sonido;
          console.log("USUARIO DB: " + this.usuario);
        })
        .catch((error)=>{ console.log("Error al traer usuario: " + error) })
    }
  }

  config(){
    this.openPage(this.pageConfig);
    this.menu.close();
  }

  sonido(){
    if(this.usuario.sonido){
      this.usuario.sonido = false;
      this.sound = false;
    }
    else{
      this.usuario.sonido = true;
      this.sound = true;
    }
    this.usuarioSrv.modificar_usuario(this.usuario);
    this._soundsServ.reproducirSonido(this._soundsServ.get_soundSuccess());
  }

  logout() {
  	this.menu.close();
    this.menu.enable(false);
  	this.auth.signOut();
  	this.nav.setRoot(LoginPage);
  }



}
