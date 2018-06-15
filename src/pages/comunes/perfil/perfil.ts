import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, FabContainer } from 'ionic-angular';
//PAGINAS
import { SupervisorListaUsuariosPage, LoginPage, MapaPage } from '../../index-paginas';
//Clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
//CAMARA
import { Camera } from '@ionic-native/camera';
import { cameraConfig } from '../../../config/camera.config';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  mostrarSpinner:boolean;

  vistaSupervisor:boolean = false; //Mostrar: viajando + activo
  modificar:boolean = false; //Variable de control (activa mod. de datos text).
  //cambios:boolean = false; //Variable de control (activa subir cambios).

  //DATOS DEL USUARIO
  usuario:Usuario; //Usuario actual

  //FOTO
  foto_byDefault:string; //Foto identificatoria por perfil
  foto_original:string;
  foto_preview:string; //Foto tomada con la cámara
  foto_subir:string; //Foto a subir al storage

  //CALLBACK function
  myCallbackFunction:Function;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public _auth: AuthServicioProvider,
              private camera: Camera,
              public _usuarioServicio: UsuarioServicioProvider) {

      this.mostrarSpinner = true;
      this.modificar = false;
  }

  //PAGINA CARGADA
  ionViewDidLoad() {
    this.traer_usuario();
    //CALLBACK para traer direccion de mapa
    this.myCallbackFunction = (_params)=> {
      console.log("callback asignado");
       return new Promise((resolve, reject) => {
               this.usuario.direccion = _params;
               resolve();
           });
    }
  }

  traer_usuario(){
    //CARGAR PERFIL PROPIO
    this.mostrarSpinner = true;
    if(!this.navParams.get('userSelected')){
      this._usuarioServicio.traer_un_usuario(this._auth.get_userUID())
      .then((user:any)=>{
          //console.log("USUARIO: " + JSON.stringify(user));
          this.usuario = user;
          this.foto_original = this.usuario.foto;
          this.traerFoto_byDefault(this.usuario.perfil);
          this.mostrarSpinner = false;
      })
      .catch((error)=>{
        this.mostrarSpinner = false;
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

        this.foto_byDefault = "assets/imgs/default_"+perfil+".png";
        console.log("Foto por defecto: " + this.foto_byDefault);
        resolve();

        err => {
          console.log("ERROR! al traer foto por defecto: " + err);
        };
    });
    return promesa;
  }

  //MENU OPCIONES
  accionMenu(event, fab:FabContainer, opcion:string){
    fab.close();
    switch(opcion){
      case "modificar":
      this.activar_modificar();
      break;
      case "borrar":
      this.borrar();
      break;
    }
  }

  //MODIFICAR
  activar_modificar(){
    if(!this.modificar){
      this.modificar = true;
    }
    else{
      this.modificar = false;
      this.traer_usuario();
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

  //CAMBIAR FOTO
  cambiar_foto(){
    //this.usuario.foto = "assets/imgs/default_chofer.png"; // Prueba
    this.camera.getPicture(cameraConfig).then((imageData) => {
      this.foto_preview = 'data:image/jpeg;base64,' + imageData;
      this.usuario.foto = this.foto_preview;
      this.foto_subir = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  //ACCIÓN GUARDAR
  guardar(){
    //SI EL USUARIO NO MODIFICO SU FOTO
    if(this.foto_original == this.usuario.foto){
        this.modificar_usuario();
    }
    //SI EL USUARIO TIENE NUEVA FOTO
    else{
      this.mostrarSpinner = true;
      this._usuarioServicio.cargar_imagen_storage(this.usuario.id_usuario, this.foto_subir)
      .then((url:any) => {
          console.log("URL de foto: " + url);
          this.usuario.foto = url.toString();
          this.mostrarSpinner = false;
      })
      .catch((error)=>{
        this.mostrarSpinner = false;
        console.log("Error: al subir archivo al storage - " + error);
      })
      .then(()=>{ this.modificar_usuario(); })
    }

  }

  //MODIFICAR USUARIO EN DB
  modificar_usuario(){
    this.mostrarSpinner = true;
    this._usuarioServicio.modificar_usuario(this.usuario)
    .then(()=>{
      console.log("Cambios guardados!");
      this.mostrarSpinner = false;
      this.mostrarAlerta("Cambios realizados con éxito!");
      this.modificar = false;
      this.traer_usuario();
    })
    .catch((error)=>{
      this.mostrarSpinner = false;
      console.log("Error al guardar cambios de usuario: " + error);
    })
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

  verMapa(){
    this.navCtrl.push(MapaPage, {'direccion' : this.usuario.direccion, 'callback':this.myCallbackFunction});
  }

  volver(){
    this.navCtrl.setRoot(SupervisorListaUsuariosPage);
  }

}
