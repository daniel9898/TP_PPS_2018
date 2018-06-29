import { Injectable } from '@angular/core';
import { UsuarioServicioProvider } from '../usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../auth-servicio/auth-servicio';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; 

@Injectable()
export class ChoferProvider {

  usuariosRef: AngularFireList<any>;

  constructor(
  	          public _usuarioServicio: UsuarioServicioProvider,
  	          public _authServicio: AuthServicioProvider,
              public afDB: AngularFireDatabase) {
    
  }


  altaAuth(credenciales:any){
    return this._authServicio.signUpSimple(credenciales);
  }
  
  async altaDb(chofer:any){
      
    this.usuariosRef = this.afDB.list('usuarios');
    return this.usuariosRef.push(chofer).key;
  }

  actualizarChofer(newUser:any){
  	return this._usuarioServicio.modificar_usuario(newUser); 
  }

}
