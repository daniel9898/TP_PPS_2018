import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  lat:number;
  lng:number;
  direccion:string;

  constructor(public navCtrl:   NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {

      if(this.navParams.get('direccion')){
        this.direccion = this.navParams.get('direccion');
        console.log("Direccion recibida: " + this.direccion);
      }
  }

  ionViewDidLoad() {
    //this.loadMap();
    this.lat =   -34.6623077
	  this.lng =  -58.364729799999964
  }

  marcarUbicacion(event){
    //Muestra las coordenadas
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  actualizarMapa(){

  }

  volver(){
    this.navCtrl.pop();
  }

}
