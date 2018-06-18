import { Injectable } from '@angular/core';
//FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthAdministradorProvider {

  constructor(public afAuth:AngularFireAuth) {
    console.log('AUTH ADMIN externo');
    //OBJETIVO: administrar usuarios sin afectar sesión actual del supervisor / superusuario
  }

}
