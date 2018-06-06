import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//clase USUARIO
import { Usuario } from '../../../classes/usuario';

//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';


@Component({
  selector: 'page-cliente-perfil',
  templateUrl: 'cliente-perfil.html',
})
export class ClientePerfilPage {

  usuario:Usuario;
  mostrarSpinner:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _auth: AuthServicioProvider,
              public _userService: UsuarioServicioProvider) {

      this.mostrarSpinner = true;

  }

  ionViewDidLoad() {
    //this.mostrarSpinner = true;
    this._userService.traer_usuarios().then(()=>{
        //console.log("USUARIOS: " + JSON.stringify(this._userService.usuariosArray));
        for(let user of this._userService.usuariosArray){
          if(this._auth.get_userEmail() == user.correo){
            this.usuario = user;
            console.log("Perfil de usuario: " + JSON.stringify(this.usuario));
            this.mostrarSpinner = false;
          }
        }
    }).catch((error)=>{
      console.log("Ocurrió un error al traer usuarios!: " + JSON.stringify(error));
    })

  }

}
