import { Injectable } from '@angular/core';
//FIREBASE
import * as firebase from 'firebase/app';
//CONFIGURACION ENVIRONMENT
import { environment } from '../../environments/environment';

@Injectable()
export class AuthAdministradorProvider {

  //OBJETIVO: administrar usuarios sin afectar sesión actual del supervisor / superusuario
  private secondaryApp = firebase.initializeApp(environment.firebase, "Secondary");
  constructor() {
    console.log('AUTH ADMIN externo');
  }

  //Inicio de sesión de usuario externo (no afecta el menú)
  signInExterno(credentials) {
		console.log('Sign in with email');
		return this.secondaryApp.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
	}

  //Alta usuario (por el supervisor)
  signUpExterno(credentials) {
    return this.secondaryApp.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  //Enviar mail de verificación: para registro usuario por primera vez
  send_ExternalEmailVerification(){
    return this.secondaryApp.auth().currentUser.sendEmailVerification();
  }

  //Modificar usuario AJENO en auth (foto - perfil)
  update_externalUserAccount(user, profile:string, foto:string){
    return user.updateProfile({
            displayName: profile,
            photoURL: foto
           });
  }

  //Borrar usuario
  delete_externalUserAccount(){
    return this.secondaryApp.auth().currentUser.delete();
  }

  //Cerrar sesion externa
  signOutExternal(){
    return this.secondaryApp.auth().signOut();
  }

  //Eliminar segunda app
  delete_secondApp(){
    this.secondaryApp.delete();
  }

}
