import { Injectable } from '@angular/core';
//*********************FIREBASE import*********************//
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//clase VIAJE
import { Viaje } from '../../classes/viaje';
//Importar map: operador para transformar la información recibida de afDB.list
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ViajeServicio {

  //LISTA VIAJES
  viajesRef: AngularFireList<any>;
  viajes: Observable<Viaje[]>;

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

    /**
     * Se devuelven todos los viajes por RxJs
     */
    getAllTrips(){
      return this.viajes;
    }

    //TRAER UN VIAJE (por algún criterio)
    traer_viajes(valor:string, criterio:string, valor2?:string){
      let promesa = new Promise((resolve, reject)=>{

        console.log("METODO: Traer viajes");

        this.viajes.subscribe(viajes => {
           switch(criterio){
              case "cliente":
              resolve(viajes.filter(v => v.id_cliente === valor )); break;
              case "chofer":
              resolve(viajes.filter(v => v.id_chofer === valor )); break;
              case "vehiculo":
              resolve(viajes.filter(v => v.id_vehiculo === valor )); break;
              case "fecha":
              resolve(viajes.filter(v => v.fecha === valor )); break;
              case "estado":
              resolve(viajes.filter(v => v.estado === valor )); break;
              case "cliente-estado":
              resolve(viajes.filter(v => v.id_cliente === valor && v.estado === valor2)); break;
              case "todos":
              resolve(viajes); break;
           }
       }, error => reject(error));
      });
      return promesa;
    }

    //TRAER UN VIAJE ACTUAL
    traer_un_viaje_actual(cliente:string, fecha:string, horaActual:number){

      let promesa = new Promise((resolve, reject)=>{

        let unViaje:Viaje; //RETORNO
        console.log("METODO: Traer viajes");

        this.viajes.forEach((value)=>{
          for(let v of value){
            if(v.estado != "cancelado" && v.estado != "cumplido"){
              if(v.id_cliente == cliente && v.fecha == fecha){
                // let horaTomada = v.hora.split(':'); //Generada al pedir viaje
                // let horaMaxima = parseInt(horaTomada[0]) + 2; //Diferencia horaria: 2
                // console.log("Hora actual: " + horaActual);
                // console.log("Hora maxima permitida: " + horaMaxima);
                // if(horaActual <= horaMaxima){
                  console.log("Hay un viaje aún activo!");
                  unViaje = new Viaje(v);
                  resolve(unViaje)
                // }
              }
            }
          }
          resolve(false);
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
    baja_viaje(viajeKey:string){
      let promesa = new Promise((resolve, reject)=>{
        this.viajesRef = this.afDB.list('viajes');
        this.viajesRef.remove(viajeKey);
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
    esperar_estado(key:string){

      return this.afDB.list('/viajes',
              ref=> ref.orderByKey()
                       .equalTo( key )//Interrupción de la lectura al alcanzar key.
             ).valueChanges()
         // .subscribe((viaje:any)=>{
         //   viaje.forEach((item) => {
         //     console.log("Estado del viaje: " + item.estado);
         //   })
         // })
    }

}
