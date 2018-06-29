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

  //TRAER RESERVAS: según parámetros
  traer_reservas(valor:string, criterio:string){
    let promesa = new Promise((resolve, reject)=>{

      let reservasArray:Viaje[] = []; //RETORNO
      console.log("METODO: Traer reservas");

      this.reservasRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).forEach((value)=>{
        for(let r of value){
          let reserva:Viaje = r;
          //console.log("Reserva: " + reserva.id_cliente);
          switch(criterio){
            case "cliente":
            if(r.id_cliente == valor) reservasArray.push(reserva); break;
            case "fecha":
            if(r.fecha == valor) reservasArray.push(reserva); break;
            case "estado":
            if(r.estado == valor) reservasArray.push(reserva); break;
            case "todos":
            reservasArray.push(reserva); break;
          }
        }
        resolve(reservasArray);
      })
    });
    return promesa;
  }

  /**
   * Agregar una reserva
   * @param reserva una reserva
   */
  addItem(reserva: Viaje) {
    reserva.estado = 'pendiente';
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
