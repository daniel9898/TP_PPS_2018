import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//clase USUARIO
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
        this.usuarios = this._userService.usuariosArray;
        this.mostrarSpinner = false;
    }).catch((error)=>{
      console.log("Ocurrió un error al traer usuarios!: " + JSON.stringify(error));
    })
  }

  initializeItems(){
    this.usuarios = this._userService.usuariosArray;
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

}
