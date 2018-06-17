import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioServicioProvider } from '../usuario-servicio/usuario-servicio';
import { Usuario } from '../../classes/usuario';
import { AuthServicioProvider } from '../auth-servicio/auth-servicio'; 

@Injectable()
export class ChoferProvider {

  constructor(
  	          public _usuarioServicio: UsuarioServicioProvider,
  	          public _authServicio: AuthServicioProvider) {
    
  }

  //REGISTRAR EN AUTHENTICATION
  altaAuth(credenciales:any){
    return this._authServicio.signUpSimple(credenciales);
  }
  //REGISTRAR EN DATABASE
  altaDb(userId:string,userEmail:string){
    return this._usuarioServicio.alta_usuario_registro(userId,userEmail);
  }
  //Actualizar firebase key recibida
  actualizarKey(newUser:any){
  	return this._usuarioServicio.modificar_usuario(newUser); 
  }

  actualizarPerfil(userProfile:string,userFoto:string){
  	return this._authServicio.update_userAccount(userProfile,userFoto);
  }

  subirImagen(){

  }

}
