import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//PAGINAS
import { SupervisorListaUsuariosPage } from '../../index-paginas';
//Clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
// //jQUERY
// import * as $ from 'jquery';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  mostrarSpinner:boolean;
  usuario:Usuario; //Usuario actual
  vistaSupervisor:boolean = false; //Mostrar: viajando + activo
  modificar:boolean = false; //Variable de control (activa mod. de datos text).
  cambios:boolean = false; //Variable de control (activa subir cambios).
  foto_byDefault:string; //Foto identificatoria por perfil

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _auth: AuthServicioProvider,
              public _userService: UsuarioServicioProvider) {

      this.mostrarSpinner = true;
      this.modificar = false;
  }

  ionViewDidLoad() {

    //CARGAR PERFIL PROPIO
    if(!this.navParams.get('userSelected')){
      this._userService.traer_usuarios().then(()=>{
          //console.log("USUARIOS: " + JSON.stringify(this._userService.usuariosArray));
          for(let user of this._userService.usuariosArray){
            if(this._auth.get_userEmail() == user.correo){
              this.usuario = user;
              this.traerFoto_byDefault(this.usuario.perfil);
              this.mostrarSpinner = false;
            }
          }
      }).catch((error)=>{
        console.log("Ocurrió un error al traer usuarios!: " + JSON.stringify(error));
      })

    //CARGAR PERFIL DE USUARIO SELECCIONADO
    }else{
      this.usuario = this.navParams.get('userSelected');
      this.traerFoto_byDefault(this.usuario.perfil).then(()=>{
        this.vistaSupervisor = true;
        this.mostrarSpinner = false;
      });
    }

  }

  traerFoto_byDefault(perfil:string){

    let promesa = new Promise((resolve, reject)=>{

        switch(perfil){
          case "cliente":
          this.foto_byDefault = "assets/imgs/default_cliente.png";
          break;
          case "chofer":
          this.foto_byDefault = "assets/imgs/default_chofer.png";
          break;
          case "supervisor":
          this.foto_byDefault = "assets/imgs/default_supervisor.png";
          break;
          case "superusuario":
          this.foto_byDefault = "assets/imgs/default_superusuario.png";
          break;
        }
        console.log("Foto por defecto: " + this.foto_byDefault);
        resolve();

        err => {
          console.log("ERROR! al traer foto por defecto: " + err);
        };
    });
    return promesa;
  }

  //MODIFICAR
  activar_modificar(){
    if(!this.modificar){
      this.modificar = true;
    }
    else{
      this.modificar = false;
    }
  }

  //BORRAR
  borrar(){

  }

  //GUARDAR
  guardar(){

  }

  //CAMBIAR FOTO
  cambiar_foto(){

  }

  volver(){
    this.navCtrl.push(SupervisorListaUsuariosPage);
  }

}
