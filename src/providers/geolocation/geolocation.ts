//GEOLOCATION
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationProvider {

  constructor(public geoLocation:Geolocation) {
    console.log('Geolocation provider');

  }

  obtenerPosicion(){
    return this.geoLocation.getCurrentPosition();
  }


}
