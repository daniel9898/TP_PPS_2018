import { Injectable } from '@angular/core';
//FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthExternoProvider {

  //private user: firebase.User;

  constructor(public afAuth:AngularFireAuth) {
    console.log('AUTH externo');
  }

  //Alta usuario
  signUpSimple(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  //Cerrar sesión
  signOut() {
    return this.afAuth.auth.signOut();
  }

}
