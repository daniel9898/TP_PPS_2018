import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
//CONFIGURACION ENVIRONMENT
import { environment } from '../environments/environment';

//GOOGLE MAPS
import { GoogleMaps } from "@ionic-native/google-maps";
import { AgmCoreModule } from '@agm/core';

//SERVICIOS
import { UsuarioServicioProvider } from '../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../providers/auth-servicio/auth-servicio';
import { VehiculosProvider } from '../providers/vehiculos/vehiculos';
import { GeocodingProvider } from '../providers/geocoding/geocoding';

//PAGES
import { MyApp } from './app.component';
import { InicioPage, RegistroPage, LoginPage, PerfilPage, MapaPage,//--------------------------------------------------------------------COMUNES
         ClienteInicioPage, ClienteViajePage, ClienteReservaPage, ClienteHistorialPage, ClienteEstadisticaPage, ClienteEncuestaPage, //--CLIENTE
         ChoferInicioPage,ChoferViajePage, ChoferHistorialPage, ChoferEstadisticaPage, ChoferEncuestaPage,//-----------------------------CHOFER
         SupervisorInicioPage,SupervisorSeguimientoPage, SupervisorEstadisticaPage, SupervisorEncuestaPage,//------------------------SUPERVISOR
         SupervisorUsuarioPage, SupervisorVehiculoPage, SupervisorListaUsuariosPage, SupervisorListaVehiculosPage, SupervisorRegistroClientePage, SupervisorRegistroVehiculoPage} from '../pages/index-paginas';
import { PhotoTakerPage } from '../pages/supervisor/photo-taker/photo-taker';



@NgModule({
  declarations: [
    MyApp,
    //COMUNES
    InicioPage,
    RegistroPage,
    LoginPage,
    PerfilPage,
    MapaPage,
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
    SupervisorRegistroClientePage,
    SupervisorRegistroVehiculoPage,
    PhotoTakerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpModule,
    AgmCoreModule.forRoot({
      	   apiKey: environment.googleMaps.apiKey
    	})

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InicioPage,
    RegistroPage,
    LoginPage,
    PerfilPage,
    MapaPage,
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
    SupervisorRegistroClientePage,
    SupervisorRegistroVehiculoPage,
    PhotoTakerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    UsuarioServicioProvider,
    AuthServicioProvider,
    VehiculosProvider,
    GoogleMaps,
    GeocodingProvider
  ]
})
export class AppModule {}
