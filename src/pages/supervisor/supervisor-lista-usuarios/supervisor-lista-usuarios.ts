import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//PAGINAS
import { PerfilPage } from '../../index-paginas';
//Clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';

@Component({
  selector: 'page-supervisor-lista-usuarios',
  templateUrl: 'supervisor-lista-usuarios.html',
})
export class SupervisorListaUsuariosPage {

  mostrarSpinner:boolean = false;
  usuarios:Usuario[] = [];
  usuarioActual:string;
  usuarioDePrueba:boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public _auth: AuthServicioProvider,
              public _usuarioServicio: UsuarioServicioProvider) {

        this.mostrarSpinner = true;
  }

  //PAGINA CARGADA
  ionViewDidLoad() {
    this.mostrarSpinner = true;
    this.usuarioActual = this._auth.get_userEmail();
    this._usuarioServicio.traer_usuarios().then(()=>{
        //console.log("USUARIOS: " + JSON.stringify(this._usuarioServicio.usuariosArray));
        this.usuarios = this._usuarioServicio.usuariosArray;
    }).catch((error)=>{
      console.log("Ocurrió un error al traer usuarios!: " + JSON.stringify(error));
    }).then(()=>{ this.mostrarSpinner = false; })
  }

  //DESUSCRIBIR
  // ionViewDidLeave(){
  //   this._usuarioServicio.desuscribir();
  // }

  initializeItems(){
    this.usuarios = this._usuarioServicio.usuariosArray;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.usuarios = this.usuarios.filter((item) => {
        return (item.perfil.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.correo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  borrar(key:string){
    this.mostrarSpinner = true;
    this._usuarioServicio.baja_usuario(key)
    .then(()=>{
          console.log("OK: usuario eliminado de database");
          this.mostrarAlerta("Usuario eliminado!");
          this.usuarios = [];
          this.navCtrl.setRoot(SupervisorListaUsuariosPage);
          this.mostrarSpinner = false;
    })
    .catch((error)=>{
      //this.mostrarAlerta("Error al realizar acción");
      console.log("Error al borrar usuario de database: " + error);
    })
  }

  verUsuario(user:Usuario){
    this.navCtrl.push(PerfilPage, {'userSelected' : user});
  }

  mostrarAlerta(msj:string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

}
