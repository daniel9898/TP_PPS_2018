import { Injectable } from '@angular/core';
//FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthServicioProvider {

  //Usuario actual
  private user: firebase.User;

  constructor(public afAuth:AngularFireAuth) {
    console.log('Auth servicio iniciado...');
      //Para mantener sesión y menú según perfil
      afAuth.authState
      .subscribe(user => { // !!!
  			this.user = user;
  		});
  }

  //Validar login
  get authenticated():boolean{
    return this.user !== null;
  }

  //Iniciar sesión (email + password)
  signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

  //Alta usuario
  signUpSimple(credentials) {
	  return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  //Enviar mail de verificación
  sendEmailVerification(){
    return this.user.sendEmailVerification();
  }

  //Borrar usuario
  delete_userAccount(){
    return this.user.delete();
  }

  //Modificar usuario PROPIO en auth (foto - perfil)
  update_userAccount(profile:string, foto:string){
    return this.user.updateProfile({
            displayName: profile,
            photoURL: foto
           });
  }

  //Modificar usuario (correo)
  update_userEmail(email:string){
    return this.user.updateEmail(email);
  }

  //Cerrar sesión
  signOut(){
    return this.afAuth.auth.signOut();
  }

  //Traer datos del usuario (de firebase)**************************************

  get_userData(){
    return this.afAuth.auth.currentUser;
  }

  get_userEmail(){
    return this.user && this.user.email;
  }

  get_userUID(){
    return this.user.uid;
  }

  get_userProfile(){
    return this.user.displayName;
  }

  get_userPhoto(){
    return this.user.photoURL;
  }

}
