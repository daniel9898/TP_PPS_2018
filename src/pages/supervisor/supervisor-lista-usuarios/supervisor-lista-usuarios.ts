import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//PAGINAS
import { PerfilPage, SupervisorRegistroUsuarioPage } from '../../index-paginas';
//Clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';
import { IdiomaProvider } from '../../../providers/idioma/idioma';

@Component({
  selector: 'page-supervisor-lista-usuarios',
  templateUrl: 'supervisor-lista-usuarios.html',
})
export class SupervisorListaUsuariosPage {

  mostrarSpinner:boolean = false;
  usuarios:Usuario[] = [];
  usuariosBackUp:Usuario[] = [];
  usuarioActual:string;
  usuarioDePrueba:boolean;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public _auth: AuthServicioProvider,
              public _usuarioServicio: UsuarioServicioProvider,
              public _utilidadesSrv: UtilidadesProvider,
              public _idiomaSrv: IdiomaProvider) {

        //IDIOMA
        this.idioma = Idioma.es;
        this.mostrarSpinner = true;
  }

  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }
  //CARGAR IDIOMA
  cargar_idioma(){
    this._idiomaSrv.getLanguageFromStorage()
      .then((idioma)=>{
        this.idioma = idioma;
        this.usuarioActual = this._auth.get_userEmail();
        this.initializeItems();
      })
  }

  //PAGINA CARGADA
  ionViewDidLoad() {

  }

  initializeItems(){
    this.mostrarSpinner = true;
    this._usuarioServicio.traer_usuarios().then((usuariosRecibidos:any)=>{
        //console.log("USUARIOS: " + JSON.stringify(this._usuarioServicio.usuariosArray));
        this.usuarios = usuariosRecibidos;
        this.usuariosBackUp = usuariosRecibidos;
    }).catch((error)=>{
      console.log("Ocurrió un error al traer usuarios!: " + JSON.stringify(error));
    }).then(()=>{ this.mostrarSpinner = false; });
  }

  resetValues(){
    this.usuarios = this.usuariosBackUp;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.resetValues();
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
          this._utilidadesSrv.showToast(this.idioma.pag_lista_usuarios_supervisor.mensaje.msj_1);
          this.initializeItems();
    })
    .catch((error)=>{
      this._utilidadesSrv.showErrorToast(this.idioma.pag_lista_usuarios_supervisor.mensaje.msj_2 + error);
      console.log("Error al borrar usuario de database: " + error);
    })
  }

  verUsuario(user:Usuario){
    this.navCtrl.push(PerfilPage, {'userSelected' : user, 'profile' : "supervisor" });
  }

  agregarUsuario(){
    this.navCtrl.push(SupervisorRegistroUsuarioPage);
  }

}
