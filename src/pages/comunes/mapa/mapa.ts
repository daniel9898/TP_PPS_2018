import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, FabContainer } from 'ionic-angular';
//SERVICIO GEOCODING
import { GeocodingProvider } from '../../../providers/geocoding/geocoding';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  lat:number;
  lng:number;
  direccion:string;
  callback:Function;

  constructor(public navCtrl:   NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private _geoCoding:GeocodingProvider) {

      if(this.navParams.get('direccion')){
        this.direccion = this.navParams.get('direccion');
        console.log("Direccion recibida: " + this.direccion);
        //CALLBACK
        this.callback = this.navParams.get("callback");
      }
  }

  ionViewDidLoad() {
    this.lat =   -34.6623077
	  this.lng =  -58.364729799999964
  }

  accionMenu(event, fab:FabContainer, opcion:string){
    fab.close();
    switch(opcion){
      case "close":
      this.volver();
      break;
      case "update":
      this.actualizarDireccion();
      break;
    }
  }

  marcarUbicacion(event){
    //Muestra las coordenadas
    console.log(event);
    this._geoCoding.obtenerDireccion(event.coords.lat, event.coords.lng)
      .then((data:any)=>{
        this.direccion = data.toString();
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
      })
      .catch((error)=>{
        console.log("ERROR: al convertir coordenadas -> dirección: " + error);
      })

  }

  marcarDireccion(){
    this._geoCoding.obtenerCoordenadas(this.direccion)
      .then((coordenadas:any)=>{
        console.log("Dato recibido de obtener coordenadas: " + coordenadas);
        this.lat = coordenadas[0];
        this.lng = coordenadas[1];
      })
      .catch((error)=>{
        console.log("ERROR: al convertir direccion -> coordenadas: " + error);
      })
  }

  actualizarDireccion(){
    this.callback(this.direccion).then(()=>{
      this.navCtrl.pop();
   });
  }

  volver(){
    this.navCtrl.pop();
  }

}
