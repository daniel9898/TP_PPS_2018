import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { vehiculo } from '../../classes/vehiculo.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/*
  Generated class for the VehiculosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehiculosProvider {

  vehiculosList: Observable<{ key: string; vehiculo: any; }[]>;
  //lista de vehiculos
  vehiculos: vehiculo[];
  //el observable para subscribirse
  //la referencia al path para hacer cambios
  vehiculosRef: AngularFireList<vehiculo>;

  constructor(private db: AngularFireDatabase) {
    //referencia temporal de testing
    this.vehiculosRef = this.db.list<vehiculo>('/vehiculosLista');
    this.vehiculosList = this.vehiculosRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, vehiculo: c.payload.val() })))
    );
  }

  public getListaVehiculos(){
     return this.vehiculosList;
  }

  /**
   * 
   * @param vehiculo un vehículo 
   */
  addItem(vehiculo: vehiculo) {
    this.vehiculosRef.push(vehiculo);
  }

  /**
   * 
   * @param key Db key
   * @param vehiculo el vehículo a actualizar 
   */
  updateItem(key: string, vehiculo: vehiculo) {
    this.vehiculosRef.update(key, vehiculo);
  }

  /**
   * 
   * @param key Db Key
   */
  deleteItem(key: string) {
    this.vehiculosRef.remove(key);
  }


}
