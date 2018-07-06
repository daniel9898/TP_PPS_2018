import { Injectable } from '@angular/core';

@Injectable()
export class SonidosProvider {

  //CONTROL
  habilitado:boolean;
  //AUDIO
  audio = new Audio();
  error_sound:string = "assets/sounds/error_sound.mp3";
  warning_sound:string = "assets/sounds/warning_sound.mp3";
  success_sound:string = "assets/sounds/success_sound.mp3";

  constructor() {
    console.log('Sonidos servicio');
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

  reproducirSonido(sound:string){
    this.audio.src = sound;
    this.audio.load();
    this.audio.play();
  }

}
