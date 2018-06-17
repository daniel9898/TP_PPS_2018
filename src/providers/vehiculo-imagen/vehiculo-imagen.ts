import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { StorageProvider } from '../storage/storage';

/*
  Generated class for the VehiculoImagenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehiculoImagenProvider extends StorageProvider {

  /**
   * Constructor del servicio
   * @param storage Angular fire storage
   */
  constructor(private storage: AngularFireStorage) {
    super();
    this.inicializarReferencia();
  }

  inicializarReferencia(){
    this.ref = this.storage.ref('vehiculos');
  }

  /**
   * Subir imagenes del vehículo
   * @param uid uid del vehículo
   * @param base64 imagen en base 64
   */
  public subirImagenVehiculo(uid:string, base64:string){
    const imgKey: string = new Date().valueOf().toString(); // 1231243245
    const nombreFile = imgKey + "_" + uid;
    const path = `${uid}/${nombreFile}`;
    return this.subirImagen(base64,path);
  }

}
