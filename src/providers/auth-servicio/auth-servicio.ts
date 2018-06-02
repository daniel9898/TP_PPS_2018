import { Injectable } from '@angular/core';
//FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthServicioProvider {

  private user: firebase.User;

  constructor(public afAuth:AngularFireAuth) {
    console.log('Hello AuthServicioProvider Provider');
      afAuth.authState.subscribe(user => {
  			this.user = user;
  		});
  }

  //Validar login
  get authenticated():boolean{
    return this.user !== null;
  }

  //Iniciar sesión
  signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

  //Crear usuario
  signUp(credentials) {
	  return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  //Cerrar sesión
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  //Traer datos del usuario (de firebase)
  get_userData(){
    return this.afAuth.auth.currentUser;
  }

  get_userEmail(){
    return this.user && this.user.email;
  }

  get_userUID(){
    return this.user.uid;
  }

}
