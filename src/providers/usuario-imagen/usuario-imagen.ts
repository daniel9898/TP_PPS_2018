import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { StorageProvider } from '../storage/storage';

/*
  Generated class for the UsuarioImagenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioImagenProvider extends StorageProvider {

  constructor(private storage: AngularFireStorage) {
    super();
    this.ref = storage.ref('usuarios');
  }


    /**
   * Subir imagenes 
   * @param uid uid del model
   * @param base64 imagen en base 64
   */
  public subirImagenUsuario(uid: string, base64: string) {
    const imgKey: string = new Date().valueOf().toString(); // 1231243245
    const nombreFile = imgKey + "_" + uid;
    return this.subirImagen(base64, nombreFile)
  }

}
