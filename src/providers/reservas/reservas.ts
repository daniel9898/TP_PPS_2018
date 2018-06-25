import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Viaje } from '../../classes/viaje.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/*
  Generated class for the ReservasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReservasProvider {

  reservasList: Observable<any[]>;
  //lista de reservas
  reservas: Viaje[];
  //el observable para subscribirse
  //la referencia al path para hacer cambios
  reservasRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    //referencia temporal de testing
    this.reservasRef = this.db.list('reservas');
    this.reservasList = this.reservasRef.snapshotChanges()
    .pipe(
    map(val => val.map( c =>  ({ key: c.key, reserva: c.payload.val() }))
    ));
  }

  public getListaReservas(){
     return this.reservasList;
  }

  /**
   * Agregar una reserva
   * @param reserva una reserva 
   */
  addItem(reserva: Viaje) {
    this.reservasRef.push(reserva);
  }

  /**
   * Actualizar una reserva
   * @param key Db key
   * @param reserva la reserva a actualizar 
   */
  updateItem(key: string, reserva: Viaje) {
    this.reservasRef.update(key, reserva).catch(error => console.log(error));
  }

  /**
   * Borra una reserva
   * @param key Db Key
   */
  deleteItem(key: string) {
    this.reservasRef.remove(key);
  }

}
