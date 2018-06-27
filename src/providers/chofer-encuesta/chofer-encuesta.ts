import { Injectable } from '@angular/core';
//*********************FIREBASE import*********************//
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
//clase ENCUESTA
import { Encuesta_chofer } from '../../classes/encuesta_chofer';
//Importar map: operador para transformar la información recibida de afDB.list
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ChoferEncuestaProvider {

  //LISTA ENCUESTAS
  encuestasRef: AngularFireList<any>;
  encuestas: Observable<any[]>;

  constructor(public afDB: AngularFireDatabase) {

    this.initialize();

  }

  //INICIALIZAR
  initialize(){
      this.encuestasRef = this.afDB.list('encuesta_chofer');
      this.encuestas = this.encuestasRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  //TRAER UNA ENCUESTA
  /*traer_viajes(valor:string, criterio:string){ //MODIFICAR ESTE METODO
    let promesa = new Promise((resolve, reject)=>{

      let encuestasArray:Encuesta_chofer[] = []; //RETORNO
      console.log("METODO: Traer viajes");

      this.encuestas.forEach((value)=>{
        for(let e of value){
          let encuesta:Encuesta_chofer = new Encuesta_chofer(e);
          switch(criterio){
            case "viaje":
            if(e.estado == valor) encuestasArray.push(encuesta); break;
            case "fecha":
            if(e.fecha == valor) encuestasArray.push(encuesta); break;
            case "todos":
            encuestasArray.push(encuesta); break;
          }
        }
        resolve(encuestasArray);
      })
    });
    return promesa;
  }*/

  //ALTA
  alta_encuesta(encuesta:Encuesta_chofer){
      let promesa = new Promise((resolve, reject)=>{
        this.encuestasRef = this.afDB.list('encuesta_chofer');
        let newKey = this.encuestasRef.push(encuesta).key;
        resolve(newKey);
      });
      return promesa;
  }

  //BAJA
  baja_encuesta(encuestaKey:string){
    let promesa = new Promise((resolve, reject)=>{
      this.encuestasRef = this.afDB.list('encuesta_chofer');
      this.encuestasRef.remove(encuestaKey);
      resolve();
    });
    return promesa;
  }

  //MODIFICACIÓN
  modificar_encuesta(encuesta:any){
    let promesa = new Promise((resolve, reject)=>{
      this.encuestasRef = this.afDB.list('encuesta_chofer');
      this.encuestasRef.update(encuesta.id_encuesta, encuesta);
      resolve();
    });
    return promesa;
  }

  //ALTA STORAGE
  cargar_imagen_storage(identificador:string, foto:string){

    let promesa = new Promise((resolve, reject)=>{

      let imgKey:string = new Date().valueOf().toString(); // 1231243245
      let nombreFile = imgKey + "_" + identificador;
      let storeRef = firebase.storage().ref();
      let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`encuestas/chofer/${ nombreFile }`)
                .putString( foto, 'base64', { contentType:'image/jpeg'});

        //EJECUCION DE TAREA DE CARGA
        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, //Tarda c/subida
            ()=>{},//Saber el % de cuantos Mbs fueron subidos
            ( error )=>{
              //Manejo de error
              console.info("ERROR EN LA CARGA", JSON.stringify(error));
              resolve(false);
            },
            ()=>{
              //Carga exitosa, TODO bien
              console.log("Archivo subido");
              uploadTask.snapshot.ref.getDownloadURL()
              .then((url)=>{
                console.log("URL GENERADA EN SERVICIO: " + url);
                resolve(url);
              });

            }
        )
    });
    return promesa;
  }

}
