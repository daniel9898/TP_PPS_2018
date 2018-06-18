import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//Clase USUARIO
import { Usuario } from '../../../classes/usuario';
//PAGINAS
import { SupervisorListaUsuariosPage, MapaPage } from '../../index-paginas';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthAdministradorProvider } from '../../../providers/auth-administrador/auth-administrador';

@Component({
  selector: 'page-supervisor-registro-cliente',
  templateUrl: 'supervisor-registro-cliente.html',
})
export class SupervisorRegistroClientePage {

  //CONTROL DE SPINNER
  mostrarSpinner:boolean;

  //VARIABLES DE CONTROL
  cambios:boolean = false; //Variable de control (activa subir cambios).

  //DATOS DEL USUARIO
  usuario:Usuario; //Usuario a crear
  user_default:any;

  //FOTO
  foto_byDefault:string; //Foto identificatoria por perfil
  foto_preview:string; //Foto tomada con la cámara
  foto_subir:string; //Foto a subir al storage

  //FROM LISTA
  from_lista:boolean;
  //CALLBACK function (para retornar dirección desde MapaPage)
  myCallbackFunction:Function;

  constructor(public navCtrl:   NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public _auth: AuthAdministradorProvider,
              public _usuarioServicio: UsuarioServicioProvider) {

              //Habilita botón atrás (hacia la lista usuarios)
              if(this.navParams.get("fromLista"))
                this.from_lista = this.navParams.get("fromLista");

              //Datos por defecto
              this.user_default = {
                key: "N/N",
                id_usuario: "N/N",
                correo: "N/N",
                nombre: "N/N",
                edad: "N/N",
                direccion: "N/N",
                perfil: "cliente",
                foto: "https://firebasestorage.googleapis.com/v0/b/kb-remiseria33.appspot.com/o/perfiles%2Fcliente_XDKTOBwO3xNoRiXNDe8fv0lHHi13.png?alt=media&token=7ada1c16-a659-4392-bb1b-47a3a15b36b3",
                viajando: false,
                activo: false
              }
              this.usuario = new Usuario(this.user_default);

  }

  ionViewDidLoad() {
    this.myCallbackFunction = (_params)=> {
      console.log("callback asignado");
       return new Promise((resolve, reject) => {
               this.usuario.direccion = _params;
               resolve();
           });
    }
  }

  //GUARDAR
  guardar(){

    // let credenciales = {
    //   email: this.usuario.correo,
    //   password: "asdasd"
    // }

  }

  //FUNCTION ATRIBUTO: Valida si hay cambios
  get hay_diferencias():boolean{
    if(this.usuario.correo    != this.user_default.correo    ||
       this.usuario.nombre    != this.user_default.nombre    ||
       this.usuario.edad      != this.user_default.edad      ||
       this.usuario.direccion != this.user_default.direccion ||
       this.usuario.foto      != this.user_default.foto      ||
       this.usuario.activo    != this.user_default.activo){
         this.cambios = true;
         return true;
    }
    else{
      this.cambios = false;
      return false;
    }
  }

  //ALERTA
  mostrarAlerta(msj:string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  //MOSTRAR MAPA
  verMapa(){
    this.navCtrl.push(MapaPage, {'direccion' : this.usuario.direccion, 'callback':this.myCallbackFunction});
  }

  //VOLVER ATRAS
  volver(){
    this.navCtrl.setRoot(SupervisorListaUsuariosPage);
  }

}
