import { Injectable } from '@angular/core';
//FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';
//SERVICIOS
import { UsuarioServicioProvider } from '../usuario-servicio/usuario-servicio';

@Injectable()
export class SonidosProvider {

  //CONTROL
  habilitado:boolean;
  //AUDIO
  audio = new Audio();
  error_sound:string = "assets/sounds/error_sound.mp3";
  warning_sound:string = "assets/sounds/warning_sound.mp3";
  success_sound:string = "assets/sounds/success_sound.mp3";
  car_engine:string = "assets/sounds/car_start_engine.mp3";

  constructor(private _usuarioServicio:UsuarioServicioProvider,
              private afAuth:AngularFireAuth) {

    console.log('Sonidos servicio');
    //this.habilitado = true;
    this.initialize();
  }

  initialize(){
    let promesa = new Promise((resolve, reject)=>{
        if(this.afAuth.auth.currentUser !== null){
          console.log("Usuario logueado: " + this.afAuth.auth.currentUser.uid);
          this._usuarioServicio.traerUsuario(this.afAuth.auth.currentUser.uid)
            .then((user:any)=>{
              if(user){
                  this.habilitado = user.sonido;
                  console.log("User sonido: " + this.habilitado + "||User: " + user);
                  resolve();
                }

            })
            .catch((error)=>{"Error al traer usuario en servicio sonido: " + error})
        }
        else{
          this.habilitado = true;
          resolve();
        }

      });
      return promesa;
  }

  get_soundError(){
    return this.error_sound;
  }

  get_soundWarning(){
    return this.warning_sound;
  }

  get_soundSuccess(){
    return this.success_sound;
  }

  get_soundCar(){
    return this.car_engine;
  }

  reproducirSonido(sound:string){
    this.initialize()
      .then(()=>{
        if(this.habilitado){
          this.audio.src = sound;
          this.audio.load();
          this.audio.play();
        }
      })
  }

}
