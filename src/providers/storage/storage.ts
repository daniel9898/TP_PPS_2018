import { Injectable } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  ref: AngularFireStorageReference;

  constructor() {
  }

  /**
   * metodo generico para subir imágenes
   * @param uid model uid
   * @param base64 imagen en base64
   * @param path el path ejemplos {nombre_imagen} o {vehiculoId/nombre_imagen}
   */
  public subirImagen(base64: string, path: string) {
    const promesa = new Promise<string>((resolve, reject) => {
      // const foto = `data:image/jpeg;base64,${base64}`;
      const imageRef: AngularFireStorageReference = this.ref.child(path);
      const task: AngularFireUploadTask = imageRef.putString(base64, 'data_url');
      task.snapshotChanges().pipe(
        finalize(() => {
          imageRef.getDownloadURL()
            .subscribe(
              next => resolve(next),
              error => reject(error)
            );
        })
      ).subscribe();

    });
    return promesa;
  }

}
