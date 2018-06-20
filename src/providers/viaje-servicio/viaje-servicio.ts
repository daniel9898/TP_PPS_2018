import { Injectable } from '@angular/core';
//*********************FIREBASE import*********************//
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//clase USUARIO
import { Viaje } from '../../classes/viaje';
//Importar map: operador para transformar la información recibida de afDB.list
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ViajeServicio {

  //LISTA VIAJES
  viajesRef: AngularFireList<any>;
  viajes: Observable<any[]>;

  constructor(public afDB: AngularFireDatabase) {
    console.log('Viaje servicio iniciado...');

      this.initialize();
    }

    //INICIALIZAR
    initialize(){
        this.viajesRef = this.afDB.list('viajes');
        this.viajes = this.viajesRef.snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
    }

    //TRAER UN VIAJE (por algún criterio)
    traer_viajes(valor:string, criterio:string){
      let promesa = new Promise((resolve, reject)=>{


        let viajesArray:Viaje[] = []; //RETORNO
        console.log("METODO: Traer viajes");

        this.viajes.forEach((value)=>{
          for(let v of value){
            let viaje:Viaje = new Viaje(v);
            switch(criterio){
              case "cliente":
              if(v.id_cliente == valor) viajesArray.push(viaje); break;
              case "chofer":
              if(v.id_chofer == valor) viajesArray.push(viaje); break;
              case "vehiculo":
              if(v.id_vehiculo == valor) viajesArray.push(viaje); break;
              case "fecha":
              if(v.fecha == valor) viajesArray.push(viaje); break;
              case "estado":
              if(v.estado == valor) viajesArray.push(viaje); break;
              case "todos":
              viajesArray.push(viaje); break;
            }
          }
          resolve(viajesArray);
        })
      });
      return promesa;
    }

    //ALTA
    alta_viaje(viaje:Viaje){
        let promesa = new Promise((resolve, reject)=>{
          this.viajesRef = this.afDB.list('viajes');
          let newKey = this.viajesRef.push(viaje).key;
          resolve(newKey);
        });
        return promesa;
    }

    //BAJA
    baja_viaje(userKey:string){
      let promesa = new Promise((resolve, reject)=>{
        this.viajesRef = this.afDB.list('viajes');
        this.viajesRef.remove(userKey);
        resolve();
      });
      return promesa;
    }

    //MODIFICACIÓN
    modificar_viaje(viaje:any){
      let promesa = new Promise((resolve, reject)=>{
        this.viajesRef = this.afDB.list('viajes');
        this.viajesRef.update(viaje.id_viaje, viaje);
        resolve();
      });
      return promesa;
    }

    //VALIDAR CAMBIO DE ESTADOS
    esperar_estado(key:string, estado:string){

      let promesa = new Promise((resolve, reject)=>{

        this.afDB.list('/viajes',
          ref=> ref.orderByKey()
                   .equalTo( key )//Interrupción de la lectura al alcanzar key.
        ).valueChanges()
         .subscribe((viaje:any)=>{
           viaje.forEach((item) => {
             console.log(item.estado);
             if(item.estado == estado) resolve(item);
           })
         })

      });
      return promesa;
    }

}
