import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//Clase USUARIO
import { Usuario } from '../../../classes/usuario';
//PAGINAS
import { SupervisorListaUsuariosPage, MapaPage } from '../../index-paginas';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';

@Component({
  selector: 'page-supervisor-registro-usuario',
  templateUrl: 'supervisor-registro-usuario.html',
})
export class SupervisorRegistroUsuarioPage {

  //CONTROL DE SPINNER
  mostrarSpinner:boolean;

  //VARIABLES DE CONTROL
  cambios:boolean = false; //Variable de control (activa subir cambios).

  //DATOS DEL USUARIO
  usuario:Usuario; //Usuario a crear

  //ATRIBUTOS
  usuario_correo:string;
  usuario_nombre:string;
  usuario_edad:string;
  usuario_direccion:string;
  usuario_perfil:string;
  usuario_foto:string;
  usuario_viajando:boolean;
  usuario_activo:boolean;

  //FOTO
  foto_byDefault:string; //Foto identificatoria por perfil
  foto_preview:string; //Foto tomada con la cámara
  foto_subir:string; //Foto a subir al storage

  //CALLBACK function (para retornar dirección desde MapaPage)
  myCallbackFunction:Function;

  constructor(public navCtrl:   NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public _auth: AuthServicioProvider,
              public _usuarioServicio: UsuarioServicioProvider) {

              this.usuario_correo="N/N";
              this.usuario_nombre="N/N";
              this.usuario_edad="N/N";
              this.usuario_direccion="N/N";
              this.usuario_perfil="N/N";
              this.usuario_foto="assets/imgs/default_profile.png";
              this.usuario_viajando=false;
              this.usuario_activo=false;

  }

  ionViewDidLoad() {
    this.myCallbackFunction = (_params)=> {
      console.log("callback asignado");
       return new Promise((resolve, reject) => {
               this.usuario_direccion = _params;
               resolve();
           });
    }
  }

  //FOTO POR DEFECTO
  traerFoto_byDefault(perfil:string){

    let promesa = new Promise((resolve, reject)=>{

        this.usuario_foto = "assets/imgs/default_"+perfil+".png";
        console.log("Foto por defecto: " + this.usuario_foto);
        resolve();

        err => {
          console.log("ERROR! al traer foto por defecto: " + err);
        };
    });
    return promesa;
  }

  //EVENTO SELECT
  perfilSeleccionado(event){
    console.log("Perfil seleccionado: " + this.usuario_perfil);
    this.mostrarSpinner = true;
    this.traerFoto_byDefault(this.usuario_perfil).then(()=>{
      this.mostrarSpinner = false;
    })
  }

  //GUARDAR
  guardar(){

  }

  //ALTA CORREO EN AUTH
  alta_auth(){

  }
  //ALTA USUARIO EN DB
  alta_db(){

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
    this.navCtrl.push(MapaPage, {'direccion' : this.usuario_direccion, 'callback':this.myCallbackFunction});
  }

  //VOLVER ATRAS
  volver(){
    this.navCtrl.setRoot(SupervisorListaUsuariosPage);
  }

}
