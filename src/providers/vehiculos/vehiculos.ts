import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { vehiculo } from '../../classes/vehiculo.model';
// import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the VehiculosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehiculosProvider {

  vehiculosList: Observable<vehiculo[]>;
  // vehiculosList: Observable<vehiculo[]>;
  //lista de vehiculos
  vehiculos: vehiculo[];
  //el observable para subscribirse
  //la referencia al path para hacer cambios
  vehiculosRef: AngularFireList<vehiculo>;
  // destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private afDB: AngularFireDatabase) {
    this.vehiculosRef = this.afDB.list<vehiculo>('/vehiculosLista');
    this.vehiculosList = this.vehiculosRef.valueChanges();
  }


  public getListaVehiculos(){
    // let promesa = new Promise<vehiculo[]>((resolve, reject)=>{

     return this.vehiculosList;
        // .takeUntil(this.destroy$)
        // .subscribe(
        // (next) => {
        //     // this.vehiculos = next;
        //     // console.log(next);
        //     // resolve(next);
        // },
        // error => {
        //   console.log(error);
        // });

    // });
    // return promesa;
  }

}
