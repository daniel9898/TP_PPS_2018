import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Google Maps
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    // Create a map after the view is ready and the native platform is ready.
    this.map = GoogleMaps.create('map_canvas');
    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {


      console.log('map is ready to use.');


    });

    // No longer wait GoogleMapsEvent.MAP_READY event
    // ( except you use map.getVisibleRegion() )
  }

}
