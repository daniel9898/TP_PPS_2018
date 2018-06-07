import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//PAGINAS
import { SupervisorListaUsuariosPage } from '../../index-paginas';
//Clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario:Usuario;
  mostrarSpinner:boolean;
  vistaSupervisor:boolean = false;
  abm_usuario:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _auth: AuthServicioProvider,
              public _userService: UsuarioServicioProvider) {

      this.mostrarSpinner = true;

  }

  ionViewDidLoad() {
    //CARGAR PERFIL PROPIO
    if(!this.navParams.get('userSelected')){
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
    //CARGAR PERFIL DE USUARIO SELECCIONADO
    }else{
      this.usuario = this.navParams.get('userSelected');
      this.vistaSupervisor = true;
      this.mostrarSpinner = false;
    }
  }

  volver(){
    this.navCtrl.push(SupervisorListaUsuariosPage);
  }

}
