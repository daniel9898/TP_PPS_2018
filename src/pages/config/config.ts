import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
//PAGES
import { MyApp } from '../../app/app.component';
//STORAGE
import { Storage } from '@ionic/storage';
//LANGUAGE PACKAGE
import { Idioma } from '../../assets/data/idioma/es';//-----ESPAÑOL
import { Idioma_en } from '../../assets/data/idioma/en';//--INGLÉS
import { Idioma_de} from '../../assets/data/idioma/de';//---ALEMÁN
import { Idioma_ru} from '../../assets/data/idioma/ru';//---RUSO
//SERVICE
import { GeocodingProvider } from '../../providers/geocoding/geocoding';
import { SonidosProvider } from '../../providers/sonidos/sonidos';
import { UtilidadesProvider } from '../../providers/utilidades/utilidades';
import { AuthServicioProvider } from '../../providers/auth-servicio/auth-servicio';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage implements AfterViewInit {
  @ViewChild('flag_es') flag_es:ElementRef;
  @ViewChild('flag_en') flag_en:ElementRef;
  @ViewChild('flag_ru') flag_ru:ElementRef;
  @ViewChild('flag_de') flag_de:ElementRef;
  @ViewChild('flag_fr') flag_fr:ElementRef;
  @ViewChild('flag_pt') flag_pt:ElementRef;

  //SPINNER
  showSpinner:boolean = false;

  //ATRIBUTES
  language:any;
  lat:number;
  lng:number;
  formatted_address:any;
  address_components:any;
  usuario:any;

  constructor(public navCtrl     : NavController,
              public navParams   : NavParams,
              private storage    : Storage,
              private menu       : MenuController,
              private _authSrv   : AuthServicioProvider,
              private _geoCoding : GeocodingProvider,
              private _sounds    : SonidosProvider,
              private _toastSrv  : UtilidadesProvider) {

      this.language = Idioma.es;
  }

  ngAfterViewInit() {
    this.showSpinner = true;
    console.log("Usuario activo en config: " + this._authSrv.get_userEmail());
    this.storage.get('language')
      .then((lang)=>{
        if(lang !== null){
          console.log("LANGUAGE: " + lang);
          this.selectLanguage(lang.code);
        }
        else{
            // BY DEFAULT
            this.selectLanguage('es');
        }
        this.showSpinner = false;
      })
      .catch((error)=>{ console.log("Error al leer storage: " + error);
      })
  }

  ionViewDidLoad() {
    if(!this.navParams.get('sin_sesion') && this.navParams.get('sin_sesion') === undefined){
      this.menu.enable(false);
    }
    // DEFAULT ADDRESS - UTN Avellaneda
    this.lat = -34.662305;
    this.lng = -58.36472349999997;
  }

  back(){
    this._sounds.reproducirSonido(this._sounds.get_soundClick());
    //VALIDAR ORIGEN
    if(this.navParams.get('sin_sesion') && this.navParams.get('sin_sesion')!== undefined){
      this.navCtrl.pop();
    }
    else{
      this.menu.enable(true);
      this.navCtrl.setRoot(MyApp);
    }

  }

  saveChanges(){
    this.showSpinner = true;
      console.log("Cambios guardados sólo en el storage");
      this.storage.clear();
      this.storage.set('language', this.language);
      this.showSpinner = false;
      this._toastSrv.showToast(this.language.pag_perfil.mensaje.msj_6);
  }

  clickLanguage(code:string){
    this._sounds.reproducirSonido(this._sounds.get_soundClick());
    this.selectLanguage(code);
  }

  selectLanguage(selection:string){
    switch(selection){
      case "es":  this.language = Idioma.es;
                  this.flag_es.nativeElement.className = 'flag flag_selected';
                  this.flag_en.nativeElement.className = 'flag';
                  this.flag_ru.nativeElement.className = 'flag';
                  this.flag_de.nativeElement.className = 'flag';
                  this.flag_fr.nativeElement.className = 'flag';
                  this.flag_pt.nativeElement.className = 'flag';
                  break;

      case "en":  this.language = Idioma_en.en;
                  this.flag_es.nativeElement.className = 'flag';
                  this.flag_en.nativeElement.className = 'flag flag_selected';
                  this.flag_ru.nativeElement.className = 'flag';
                  this.flag_de.nativeElement.className = 'flag';
                  this.flag_fr.nativeElement.className = 'flag';
                  this.flag_pt.nativeElement.className = 'flag';
                  break;

      case "de":  this.language = Idioma_de.de;
                  this.flag_es.nativeElement.className = 'flag';
                  this.flag_en.nativeElement.className = 'flag';
                  this.flag_ru.nativeElement.className = 'flag';
                  this.flag_de.nativeElement.className = 'flag flag_selected';
                  this.flag_fr.nativeElement.className = 'flag';
                  this.flag_pt.nativeElement.className = 'flag';
                  break;

      case "ru":  this.language = Idioma_ru.ru;
                  this.flag_es.nativeElement.className = 'flag';
                  this.flag_en.nativeElement.className = 'flag';
                  this.flag_ru.nativeElement.className = 'flag flag_selected';
                  this.flag_de.nativeElement.className = 'flag';
                  this.flag_fr.nativeElement.className = 'flag';
                  this.flag_pt.nativeElement.className = 'flag';
                  break;

      case "fr":  this.language = Idioma_en.en;
                  this.flag_es.nativeElement.className = 'flag';
                  this.flag_en.nativeElement.className = 'flag';
                  this.flag_ru.nativeElement.className = 'flag';
                  this.flag_de.nativeElement.className = 'flag';
                  this.flag_fr.nativeElement.className = 'flag flag_selected';
                  this.flag_pt.nativeElement.className = 'flag';
                  break;

      case "pt":  this.language = Idioma_en.en;
                  this.flag_es.nativeElement.className = 'flag';
                  this.flag_en.nativeElement.className = 'flag';
                  this.flag_ru.nativeElement.className = 'flag';
                  this.flag_de.nativeElement.className = 'flag';
                  this.flag_fr.nativeElement.className = 'flag';
                  this.flag_pt.nativeElement.className = 'flag flag_selected';
                  break;
    }
  }

  // MAP USER ACTION
  selectLocation(event){
    this.showSpinner = true;
    this._sounds.reproducirSonido(this._sounds.get_soundClick());
    this._geoCoding.obtenerDireccionDetalle(event.coords.lat, event.coords.lng)
      .then((data:any)=>{
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
        if(data != "undefined"){
          this.formatted_address = data.direccion;
          this.address_components = data.detalle;
          console.log("Dirección: " + this.formatted_address);
          console.log("Detalle: " + JSON.stringify(this.address_components));
          this.define_countryCode();
        }
        this.showSpinner = false;
      })
      .catch((error)=>{
        console.log("ERROR: al convertir coordenadas -> dirección: " + error);
      })
  }

//DEFINE COUNTRY CODE
define_countryCode(){
  for(let component of this.address_components){
    if(component.short_name !== null){
      console.log("DETALLE: " + component.short_name);
      if(component.short_name.length == 2){
        this.define_languageByCountryCode(component.short_name);
      }
    }
  }
}

//DEFINE LANGUAGE BY COUNTRY CODE
define_languageByCountryCode(code:string){
  switch(code){
    //ES - Español
    case 'AR':
    case 'UY':
    case 'CL':
    case 'PY':
    case 'BO':
    case 'PE':
    case 'EC':
    case 'CO':
    case 'VE':
    case 'PA':
    case 'CR':
    case 'NI':
    case 'SV':
    case 'HN':
    case 'GT':
    case 'DO':
    case 'PR':
    case 'MX':
    case 'ES':
    case 'GQ':
    this.selectLanguage('es'); break;
    //EN - English
    case 'GY':
    case 'US':
    case 'BZ':
    case 'VI':
    case 'JM':
    case 'US':
    case 'IE':
    case 'GB':
    case 'PG':
    case 'AU':
    case 'NZ':
    case 'SD':
    case 'SL':
    case 'LR':
    case 'GH':
    case 'NG':
    case 'SS':
    case 'KE':
    case 'UG':
    case 'ZM':
    case 'MW':
    case 'ZW':
    case 'BW':
    case 'NA':
    case 'ZA':
    case 'LS':
    case 'SZ':
    this.selectLanguage('en'); break;
    //DE - Deutsch
    case 'DE':
    case 'CH':
    case 'AT':
    this.selectLanguage('de'); break;
    //RU - Pусский
    case 'BY':
    case 'UA':
    case 'MD':
    case 'RU':
    case 'KZ':
    case 'UZ':
    case 'KG':
    case 'TJ':
    this.selectLanguage('ru'); break;
    //FR - Français
    case 'GF':
    case 'HT':
    case 'CA':
    case 'FR':
    case 'BE':
    case 'DZ':
    case 'TN':
    case 'ML':
    case 'NE':
    case 'TD':
    case 'SN':
    case 'GN':
    case 'CI':
    case 'TG':
    case 'BF':
    case 'NE':
    case 'CM':
    case 'CF':
    case 'DJ':
    case 'CD':
    case 'GA':
    case 'MG':
    this.selectLanguage('fr'); break;
    //PT - Portugues
    case 'BR':
    case 'PT':
    case 'GW':
    case 'CG':
    case 'AO':
    case 'MZ':
    this.selectLanguage('pt'); break;
    default:
    this.selectLanguage('es'); break;
  }
}

}
