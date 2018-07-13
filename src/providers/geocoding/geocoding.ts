import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//CONFIGURACION ENVIRONMENT
import { environment } from '../../environments/environment';

@Injectable()
export class GeocodingProvider {

  constructor(public _http: Http) {
    console.log('Provider geocoding iniciado...');
  }

  //METODO -> OBTENER UNA DIRECCION (a partir de coordenadas)
  obtenerDireccion(lat:number, lng:number){
    let promesa = new Promise((resolve, reject)=>{
      let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +","+ lng + "&key=" + environment.geocoding.apiKey;
      this._http.get(url)
          .subscribe( (data:any) =>{
                // for (let value of data.json().results) {
                //   console.log(value.formatted_address);
                // }
                let direccion:string = data.json().results[0].formatted_address;
                console.log("DATOS AL OBTENER DIRECCION: " + direccion);
                resolve(direccion);
          }, error=>{
            console.log("ERROR! al obtener dirección: " + error);
          });
    });
    return promesa;
  }

  //METODO -> OBTENER UNA DIRECCION + DETALLE (a partir de coordenadas)
  obtenerDireccionDetalle(lat:number, lng:number){
    let promesa = new Promise((resolve, reject)=>{
      let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +","+ lng + "&key=" + environment.geocoding.apiKey;
      this._http.get(url)
          .subscribe( (data:any) =>{
                console.log("DATA: " + data.results);
                let direccion:any;
                if(data.json().results[0] != undefined){
                  direccion = {
                      direccion: data.json().results[0].formatted_address,
                      detalle: data.json().results[0].address_components
                  }
                }
                else{
                  direccion = "undefined";
                }

                console.log("DATOS AL OBTENER DIRECCION: " + direccion);
                resolve(direccion);
          }, error=>{
            console.log("ERROR! al obtener dirección: " + error);
          });
    });
    return promesa;
  }

  //METODO -> OBTENER COORDENADAS (a partir de una dirección)
  obtenerCoordenadas(direccion:string){
    let promesa = new Promise<number[]>((resolve, reject)=>{
      let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+ direccion +"&key=" + environment.geocoding.apiKey;
      this._http.get(url)
          .subscribe( (data:any) =>{
                let latlng:number[] = [data.json().results[0].geometry.location.lat, data.json().results[0].geometry.location.lng];
                console.log("LatLng: " + latlng);
                resolve(latlng);
          }, error=>{
            console.log("ERROR! al obtener coordenadas: " + error);
          });
    });
    return promesa;
  }

}
