import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//PAGES
import { MyApp } from './app.component';
import { InicioPage, RegistroPage, LoginPage, PerfilPage,
         ClienteInicioPage, ClienteViajePage, ClienteReservaPage, ClienteHistorialPage, ClienteEstadisticaPage, ClienteEncuestaPage, //--CLIENTE
         ChoferInicioPage, ChoferViajePage, ChoferHistorialPage, ChoferEstadisticaPage, ChoferEncuestaPage,//-----------------------------CHOFER
         SupervisorInicioPage, SupervisorSeguimientoPage, SupervisorEstadisticaPage, SupervisorEncuestaPage,//------------------------SUPERVISOR
         SupervisorUsuarioPage, SupervisorVehiculoPage, SupervisorListaUsuariosPage, SupervisorListaVehiculosPage, SupervisorRegistroUsuarioPage, SupervisorRegistroVehiculoPage} from '../pages/index-paginas';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//CONFIGURACION FIREBASE
import { environment } from '../environments/environment';

//HTTP
import { HttpModule } from '@angular/http';

//SERVICIOS
import { UsuarioServicioProvider } from '../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../providers/auth-servicio/auth-servicio';

//CAMERA
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    //COMUNES (4)
    InicioPage,
    RegistroPage,
    LoginPage,
    PerfilPage,
    //CLIENTE (6)
    ClienteInicioPage,
    ClienteViajePage,
    ClienteReservaPage,
    ClienteHistorialPage,
    ClienteEstadisticaPage,
    ClienteEncuestaPage,
    //CHOFER (5)
    ChoferInicioPage,
    ChoferViajePage,
    ChoferHistorialPage,
    ChoferEstadisticaPage,
    ChoferEncuestaPage,
    //SUPERVISOR (10)
    SupervisorInicioPage,
    SupervisorSeguimientoPage,
    SupervisorEstadisticaPage,
    SupervisorEncuestaPage,
    SupervisorUsuarioPage,
    SupervisorVehiculoPage,
    SupervisorListaUsuariosPage,
    SupervisorListaVehiculosPage,
    SupervisorRegistroUsuarioPage,
    SupervisorRegistroVehiculoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //COMUNES
    InicioPage,
    RegistroPage,
    LoginPage,
    PerfilPage,
    //CLIENTE
    ClienteInicioPage,
    ClienteViajePage,
    ClienteReservaPage,
    ClienteHistorialPage,
    ClienteEstadisticaPage,
    ClienteEncuestaPage,
    //CHOFER
    ChoferInicioPage,
    ChoferViajePage,
    ChoferHistorialPage,
    ChoferEstadisticaPage,
    ChoferEncuestaPage,
    //SUPERVISOR
    SupervisorInicioPage,
    SupervisorSeguimientoPage,
    SupervisorEstadisticaPage,
    SupervisorEncuestaPage,
    SupervisorUsuarioPage,
    SupervisorVehiculoPage,
    SupervisorListaUsuariosPage,
    SupervisorListaVehiculosPage,
    SupervisorRegistroUsuarioPage,
    SupervisorRegistroVehiculoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioServicioProvider,
    AuthServicioProvider,
    Camera
  ]
})
export class AppModule {}
