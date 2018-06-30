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
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NguiMapModule} from '@ngui/map';
//GEOLOCATION
import { Geolocation } from '@ionic-native/geolocation';
//QR plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//CHARTS
import { ChartsModule } from 'ng2-charts/ng2-charts';

//SERVICIOS
import { UsuarioServicioProvider } from '../providers/usuario-servicio/usuario-servicio';
import { UsuarioImagenProvider } from '../providers/usuario-imagen/usuario-imagen';
import { VehiculosProvider } from '../providers/vehiculos/vehiculos';
import { VehiculoImagenProvider } from '../providers/vehiculo-imagen/vehiculo-imagen';
import { ChoferProvider } from '../providers/chofer/chofer';
import { DateTimeProvider } from '../providers/date-time/date-time';

//DIRECTIVAS
import { DirectivesModule } from '../directives/directives.module';

//PAGES
import { MyApp } from './app.component';
import {
  InicioPage, RegistroPage, LoginPage, PerfilPage, MapaPage,//--------------------------------------------------------------------COMUNES
  ClienteInicioPage, ClienteViajePage, ClienteReservaPage, ClienteHistorialPage, ClienteEstadisticaPage, ClienteEncuestaPage, //--CLIENTE
  ClienteEncuestasPage,
  ChoferInicioPage, ChoferViajePage, ChoferHistorialPage, ChoferEstadisticaPage, ChoferEncuestaPage,//-----------------------------CHOFER
  SupervisorInicioPage, SupervisorSeguimientoPage, SupervisorEstadisticaPage, SupervisorEncuestaPage,//------------------------SUPERVISOR
  SupervisorUsuarioPage, SupervisorVehiculoPage, SupervisorListaUsuariosPage, SupervisorListaVehiculosPage, SupervisorRegistroClientePage, SupervisorRegistroVehiculoPage, SupervisorRegistroChoferPage, SupervisorListaChoferesPage
} from '../pages/index-paginas';
import { PhotoTakerPage } from '../pages/supervisor/photo-taker/photo-taker';
import { ReservasProvider } from '../providers/reservas/reservas';
import { ClienteReservasPage } from '../pages/cliente/cliente-reservas/cliente-reservas';
import { AuthServicioProvider } from '../providers/auth-servicio/auth-servicio';
import { GeocodingProvider } from '../providers/geocoding/geocoding';
import { StorageProvider } from '../providers/storage/storage';
import { AuthAdministradorProvider } from '../providers/auth-administrador/auth-administrador';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { ViajeServicio } from '../providers/viaje-servicio/viaje-servicio';
import { ClienteEncuestaServicio } from '../providers/cliente-encuesta-servicio/cliente-encuesta-servicio';
import { QrServicioProvider } from '../providers/qr-servicio/qr-servicio';
import { UtilidadesProvider } from '../providers/utilidades/utilidades';
import { ListaViajesPage } from '../pages/chofer/lista-viajes/lista-viajes';
import { SupervisorRegistroUsuarioPage } from '../pages/supervisor/supervisor-registro-usuario/supervisor-registro-usuario';
import { ChoferEncuestaProvider } from '../providers/chofer-encuesta/chofer-encuesta';


import { PopoverClavePage } from '../pages/comunes/popover-clave/popover-clave';
import { SupervisorViajesReservasPage } from '../pages/supervisor/supervisor-viajes-reservas/supervisor-viajes-reservas';
import { SupervisorListaViajesPage } from '../pages/supervisor/supervisor-lista-viajes/supervisor-lista-viajes';
import { SupervisorChoferesDisponiblesPage } from '../pages/supervisor/supervisor-choferes-disponibles/supervisor-choferes-disponibles';
import { SupervisorAsignaViajePage } from '../pages/supervisor/supervisor-asigna-viaje/supervisor-asigna-viaje';

@NgModule({
  declarations: [
    MyApp,
    //COMUNES
    InicioPage,
    RegistroPage,
    LoginPage,
    PerfilPage,
    MapaPage,
    PopoverClavePage,
    //CLIENTE
    ClienteInicioPage,
    ClienteViajePage,
    ClienteReservaPage,
    ClienteHistorialPage,
    ClienteEstadisticaPage,
    ClienteEncuestaPage,
    ClienteReservasPage,
    ClienteEncuestasPage,
    //CHOFER
    ChoferInicioPage,
    ChoferViajePage,
    ChoferHistorialPage,
    ChoferEstadisticaPage,
    ChoferEncuestaPage,
    ListaViajesPage,
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
    SupervisorRegistroChoferPage,
    SupervisorRegistroUsuarioPage,
    SupervisorListaChoferesPage,
    PhotoTakerPage,
    SupervisorViajesReservasPage,
    SupervisorListaViajesPage,
    SupervisorChoferesDisponiblesPage,
    SupervisorAsignaViajePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpModule,
    DirectivesModule,
    NguiMapModule.forRoot({ apiUrl: `https://maps.google.com/maps/api/js?key=${environment.googleMaps.apiKey}` }),
    AgmCoreModule.forRoot({ apiKey: environment.googleMaps.apiKey }),
    AgmDirectionModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InicioPage,
    RegistroPage,
    LoginPage,
    PerfilPage,
    MapaPage,
    PopoverClavePage,
    //CLIENTE
    ClienteInicioPage,
    ClienteViajePage,
    ClienteReservaPage,
    ClienteHistorialPage,
    ClienteEstadisticaPage,
    ClienteEncuestaPage,
    ClienteReservasPage,
    ClienteEncuestasPage,
    //CHOFER
    ChoferInicioPage,
    ChoferViajePage,
    ChoferHistorialPage,
    ChoferEstadisticaPage,
    ChoferEncuestaPage,
    ListaViajesPage,
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
    SupervisorRegistroChoferPage,
    SupervisorRegistroUsuarioPage,
    SupervisorListaChoferesPage,
    PhotoTakerPage,
    SupervisorViajesReservasPage,
    SupervisorListaViajesPage,
    SupervisorChoferesDisponiblesPage,
    SupervisorAsignaViajePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    UsuarioServicioProvider,
    AuthServicioProvider,
    VehiculosProvider,
    GeocodingProvider,
    StorageProvider,
    VehiculoImagenProvider,
    UsuarioImagenProvider,
    ChoferProvider,
    AuthAdministradorProvider,
    Geolocation,
    GeolocationProvider,
    ViajeServicio,
    ClienteEncuestaServicio,
    BarcodeScanner,
    QrServicioProvider,
    DateTimeProvider,
    ReservasProvider,
    UtilidadesProvider,
    ChoferEncuestaProvider,
    ChartsModule
  ]
})
export class AppModule { }
