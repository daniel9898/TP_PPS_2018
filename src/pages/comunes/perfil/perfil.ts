import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//PAGINAS
import { SupervisorListaUsuariosPage, LoginPage } from '../../index-paginas';
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

  mostrarSpinner:boolean;
  usuario:Usuario; //Usuario actual
  vistaSupervisor:boolean = false; //Mostrar: viajando + activo
  modificar:boolean = false; //Variable de control (activa mod. de datos text).
  cambios:boolean = false; //Variable de control (activa subir cambios).
  foto_byDefault:string; //Foto identificatoria por perfil

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public _auth: AuthServicioProvider,
              public _usuarioServicio: UsuarioServicioProvider) {

      this.mostrarSpinner = true;
      this.modificar = false;
  }

  //PAGINA CARGADA
  ionViewDidLoad() {

    //CARGAR PERFIL PROPIO
    if(!this.navParams.get('userSelected')){
      this._usuarioServicio.traer_un_usuario(this._auth.get_userUID())
      .then((user:any)=>{
          //console.log("USUARIO: " + JSON.stringify(user));
          this.usuario = user;
          this.traerFoto_byDefault(this.usuario.perfil);
          this.mostrarSpinner = false;
      })
      .catch((error)=>{
        console.log("Ocurrió un error al traer un usuario!: " + JSON.stringify(error));
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

    //USUARIO QUE BORRA SU CUENTA
    if(!this.vistaSupervisor){
      this._auth.delete_userAccount()
      .then(()=>{
        console.log("OK: usuario eliminado de authentication");
      })
      .catch((error)=>{
        console.log("Error al eliminar usuario de Authentication" + error);
      })
      .then(()=>{
        this._usuarioServicio.baja_usuario(this.usuario.key)
        .then(()=>{
              console.log("OK: usuario eliminado de database");
              this.mostrarAlerta("Usuario eliminado!");
              this.navCtrl.setRoot(LoginPage);
        })
      })
      .catch((error)=>{
        console.log("Error al borrar usuario de database" + error);
      });
    }

    //SUPER* QUE BORRA CUENTA DE TERCERO
    if(this.vistaSupervisor){
      this._usuarioServicio.baja_usuario(this.usuario.key)
      .then(()=>{
            console.log("OK: usuario eliminado de database");
            this.mostrarAlerta("Usuario eliminado!");
            this.navCtrl.setRoot(SupervisorListaUsuariosPage);
      })
      .catch((error)=>{
        console.log("Error al borrar usuario de database: " + error);
      })
    }


  }

  //GUARDAR
  guardar(){
      this._usuarioServicio.modificar_usuario(this.usuario)
      .then(()=>{
        console.log("Cambios guardados!");
        this.mostrarAlerta("Cambios realizados con éxito!");
        this.modificar = false;
      })
      .catch((error)=>{
        console.log("Error al guardar cambios de usuario: " + error);
      })

  }

  //CAMBIAR FOTO
  cambiar_foto(){

  }

  mostrarAlerta(msj:string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  volver(){
    this.navCtrl.setRoot(SupervisorListaUsuariosPage);
  }

}
