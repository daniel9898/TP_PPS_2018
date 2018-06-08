import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//*********************FIREBASE import*********************//
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import * as firebase from 'firebase';
//clase USUARIO
import { Usuario } from '../../classes/usuario';
//Importar map: operador para transformar la información recibida de afDB.list
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


@Injectable()
export class UsuarioServicioProvider {

  //USUARIOS
  usuariosArray:Usuario[] = []; //Array que aloja a los usuarios leídos de la BD
  usuariosTest:any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();//referencia para realizar unsubscribe

  //LISTA USUARIOS
  usuariosRef: AngularFireList<any>;
  usuarios: Observable<any[]>;

  constructor(  public afDB: AngularFireDatabase,
                public afAuth:AngularFireAuth,
                private _http:Http ) {

    console.log('Provider USUARIOS iniciado...');
  }

  //TRAER USUARIOS DE PRUEBA
  obtener_usuarios_prueba (){

    let promesa = new Promise((resolve, reject)=>{
      this._http.get("assets/data/usuarios.json")
          .subscribe( respuesta =>{
                //console.log("Obtención de usuarios de prueba " + JSON.stringify(respuesta.json()) );
                for(let user of respuesta.json().usuarios){
                  this.usuariosTest.push(user);
                }
                resolve("Todo ok");
          }, error=>{
            console.log("ERROR! al leer usuarios de prueba: " + JSON.stringify(error));
          });
    });
    return promesa;
  }


  //TRAER TODOS LOS USUARIOS
  traer_usuarios(){
    let promesa = new Promise((resolve, reject)=>{

      //NUEVA MANERA
      this.usuariosArray = [];
      this.usuariosRef = this.afDB.list('usuarios');
      this.usuarios = this.usuariosRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );

      //SUSCRIBIR OBSERVABLE "Usuarios"
      this.usuarios
        .takeUntil(this.destroy$)
        .subscribe(
        (data:any) => {
            //console.log(data);
            for (let i = 0; i < data.length; i++) {
                let usuario:Usuario = new Usuario(data[i]);
                this.usuariosArray.push(usuario);
            }
            resolve();
        },
        err => {
          console.log("ERROR! mensaje: " + JSON.stringify(err));
        });

    });
    return promesa;
  }

  //CREAR USUARIO
  crear_usuario(userId:string, userEmail:string){
    console.log("Datos recibidos: " + userId + " + " + userEmail);
    let nuevo_user = {
      id_usuario: userId,
      correo: userEmail,
      perfil: "cliente",
      foto: "assets/imgs/default_cliente.png",
      viajando: false,
      activo: true
    }

    console.log("Usuario nuevo: " + JSON.stringify(nuevo_user));
    this.usuariosRef = this.afDB.list('usuarios');
    this.usuariosRef.push(nuevo_user);
    //return this.afDB.object(`usuarios/${ userId }`).update(newUser); // --- subida especificando custom key
  }

  //DESUSCRIBIR
  desuscribir(){
    this.destroy$.next();
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.complete();
    console.log("Observables de provider usuarios desuscriptos");
  }

}
