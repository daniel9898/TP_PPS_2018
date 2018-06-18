import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//Clase USUARIO
import { Usuario } from '../../../classes/usuario';
//PAGINAS
import { SupervisorListaUsuariosPage, MapaPage } from '../../index-paginas';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthExternoProvider } from '../../../providers/auth-externo/auth-externo';

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
              public _auth: AuthExternoProvider,
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
                foto: "assets/imgs/default_cliente.png",
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

    let credenciales = {
      email: this.usuario.correo,
      password: "asdasd"
    }

    //1- ALTA EN AUTH
    this._auth.signUpSimple(credenciales)
      .then((data)=>{
        this.usuario.id_usuario = data.user.uid.toString();
    //2- ALTA EN DB
        this._usuarioServicio.alta_usuario(this.usuario)
          .then((key:any)=>{
            let newKey = key;
            console.log("Nueva key: " + newKey);
            this.usuario.key = newKey;
    //3- MODIFICACION DB (se agrega key)
            this._usuarioServicio.modificar_usuario(this.usuario)
              .then(()=>{
    //4- CERRAR SESION DE NUEVO USUARIO
                  //this.mostrarAlerta("Usuario creado");
                  this._auth.signOut()
                    .then(()=>{ this.mostrarAlerta("Usuario creado"); })
              })
              .catch((error)=>{
                console.log("Error al modificar usuario: " + error);
              });
          })
          .catch((error)=>{
            console.log("Error al crear usuario en base de datos: " + error);
          });
      })
      .catch((error)=>{
        console.log("Error al registrar usuario (auth): " + error);
        var errorCode = error.code;
        //var errorMessage = error.message;
        switch(errorCode){
          case "auth/email-already-in-use":
          this.mostrarAlerta("Cuenta ya existente");
          break;
          case "auth/invalid-email":
          this.mostrarAlerta("Correo invalido");
          break;
        }
      })

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
