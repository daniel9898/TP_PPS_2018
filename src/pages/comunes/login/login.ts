import { Component } from '@angular/core';
import { NavController, ToastController, FabContainer } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//STORAGE
import { Storage } from '@ionic/storage';
//PAGINAS
import { RegistroPage } from '../../index-paginas';
import { ConfigPage } from '../../config/config';
//clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { AuthAdministradorProvider } from '../../../providers/auth-administrador/auth-administrador';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { IdiomaProvider } from '../../../providers/idioma/idioma';
//jQUERY
import * as $ from 'jquery';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';//-----ESPAÑOL

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mostrarSpinner:boolean = false;
  //ATRIBUTOS
  usuario:Usuario = null;
  mail_verificado:boolean;
  update_profile:boolean;
  credenciales:any;
  //user: Observable<firebase.User>;
  userActive:any;
  myLoginForm:FormGroup;
  focus1:boolean = false;
  focus2:boolean = false;
  userNameTxt:string;
  userPassTxt:string;
  usuariosDePrueba:any[] = [];
  //TEXTO
  idioma:any;

  //CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fbLogin:FormBuilder,
              private storage  : Storage,
              private _usuarioServicio:UsuarioServicioProvider,
              private _authServicio:AuthServicioProvider,
              private _authAdmin:AuthAdministradorProvider,
              private _utilitiesServ: UtilidadesProvider,
              private _idiomaSrv: IdiomaProvider) {

        console.log("¿Sesión activa?: " + this._authServicio.authenticated);
        //IDIOMA
        this.idioma = Idioma.es;

        this.userNameTxt = "";
        this.userPassTxt = null;
        this.myLoginForm = this.fbLogin.group({
          userEmail: ['', [Validators.required, Validators.email]],
          userPassword: ['', [Validators.required]],
        });
  }

  //INICIO
  ionViewDidLoad(){
    console.log("Página cargada!");
  }

  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this._idiomaSrv.getLanguageFromStorage()
      .then((idioma)=>{
        this.idioma = idioma;
      })
  }

  //CARGAR IDIOMA
  cargar_idioma(){
    this.mostrarSpinner = true;
    this.storage.get('language')
      .then((lang)=>{
        if(lang !== null){
          //console.log("LANGUAGE: " + lang);
          this.idioma = lang;
        }
        else{
            // BY DEFAULT
            this.idioma = Idioma.es;
        }
        this.mostrarSpinner = false;
      })
      .catch((error)=>{ console.log("Error al leer storage: " + error);
      })
  }

  //DATOS DE PRUEBA
  ingresoDePrueba(event, fab:FabContainer, userProfile:string){
    fab.close();

    this._usuarioServicio.obtener_usuarios_prueba().then((respuesta)=>{
        console.log("DATO recibido: " + respuesta);
        for(let user of this._usuarioServicio.usuariosTest){
            if(user.perfil == userProfile){
              this.userNameTxt = user.correo;
              this.userPassTxt = user.clave;
            }
        }
        $('#autoLogo').attr("src",'assets/imgs/auto_encendido.png');
    });
  }

  //FINES DE ESTILO
  perdioFoco(input:number){
    switch(input)
    {
      case 1:
      this.focus1 = false;
      $('#autoLogo').attr("src",'assets/imgs/auto_apagado.png');
      console.log("Perdio foco 1!");
      break;
      case 2:
      this.focus2 = false;
      $('#autoLogo').attr("src",'assets/imgs/auto_apagado.png');
      console.log("Perdio foco 2!");
      break;
    }
  }

  tieneFoco(input:number){
    switch(input)
    {
      case 1:
      this.focus1 = true;
      $('#autoLogo').attr("src",'assets/imgs/auto_encendido.png');
      console.log("Tiene foco 1!");
      break;
      case 2:
      this.focus2 = true;
      $('#autoLogo').attr("src",'assets/imgs/auto_encendido.png');
      console.log("Tiene foco 2!");
      break;
    }
  }

  //VALIDACION ESTADO DEL USUARIO
  validarUsuario(){
    this.mostrarSpinner = true;

    //CREDENCIALES
    this.credenciales = {
      email: this.myLoginForm.value.userEmail,
      password: this.myLoginForm.value.userPassword
    };

  // 1) INTENTAR LOGUEARSE
    this._authAdmin.signInExterno(this.credenciales)
      .then(data => {
        console.log('Email utilizado: ' + data.user.email);
        this.mail_verificado = data.user.emailVerified;

   // 2) TRAER USUARIO
        this._usuarioServicio.traer_un_usuario(data.user.uid)
        .then((user:any)=>{

    //2-A USUARIO EXISTE
          if(user){
              console.log("Usuario traído: " + JSON.stringify(user));
              this.usuario = new Usuario(user);
   // 3) VALIDAR INGRESO

     //A- USUARIO INACTIVO
              if(!this.usuario.activo)
                this.usuario_inhabilitado();
     //B- USUARIO ACTIVO
              if(this.usuario.activo)
                this.usuario_activo();
          }
  //2-B USUARIO NO EXISTE
          else{
            this.usuario_inexistente();
          }
        })
        .catch((error)=>{
          this.mostrarSpinner = false;
          console.log("Error al traer usuario: " + error);
        })

      })
      .catch(error => { console.log('Error: al realizar signIn ',error.message);
      let errorCode = error.code;
      switch(errorCode){
        case "auth/wrong-password":
        this._utilitiesServ.showWarningToast(this.idioma.pag_login.mensaje.msj_1);
        break;
        case "auth/invalid-email":
        case "auth/user-not-found":
        this._utilitiesServ.showErrorToast(this.idioma.pag_login.mensaje.msj_2);
        break;
      }
      this.mostrarSpinner = false;
      });
  }

  //ACCIONES SEGUN ESTADO DEL USUARIO
  usuario_activo(){
    console.log("Coincidencia en el usuario!");
    if(this.mail_verificado && !this.usuario.verificado){
      this.usuario_mailVerificado()
        .then(()=>{
          this.loguearse();
        })
    }
    else{
      this.loguearse();
    }
  }

  usuario_inhabilitado(){
    console.log("El usuario no está activo");
    if(this.mail_verificado && !this.usuario.verificado){
      this.usuario_mailVerificado()
        .then(()=>{
          this.desloguearse();
        })
    }
    else{
      this.desloguearse();
    }

  }

  usuario_inexistente(){ //Usuario borrado por supervisor (faltaba eliminar auth)
    console.log("El usuario fue eliminado!");
    this._authAdmin.delete_externalUserAccount();
    this._utilitiesServ.showErrorToast(this.idioma.pag_login.mensaje.msj_2);
    this.navCtrl.setRoot(LoginPage);
  }

  //Se actualiza el atributo "verificado" del usuario a "true"
  usuario_mailVerificado(){
    let promesa = new Promise((resolve, reject)=>{
      this.usuario.verificado = true;
      this._usuarioServicio.modificar_usuario(this.usuario)
        .then(()=>{
          console.log("El usuario con mail verificado ha sido activado");
          resolve();
        })
        .catch((error)=>{
          console.log("Error al activar usuario con mail verificado: " + error);
        });
    });
    return promesa;
  }

  // ACCIONES DE LOGUEO******************************************************//
  loguearse(){
    this._authServicio.signInWithEmail(this.credenciales)
      .then(()=>{
        this._utilitiesServ.showToast(this.idioma.pag_login.mensaje.msj_4);
        this.mostrarSpinner = false;
      })
  }

  desloguearse(){
    this._authAdmin.signOutExternal()
      .then(()=>{
        this.mostrarSpinner = false;
        this._utilitiesServ.showWarningToast(this.idioma.pag_login.mensaje.msj_3);
      })
  }

  // DIRECCIONAR**************************************************************//

  elegir_idioma(){
    this.navCtrl.push(ConfigPage, { 'sin_sesion': true });
  }

  registrarse(){
    this.navCtrl.push(RegistroPage);
  }

}
