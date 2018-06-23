import { Component } from '@angular/core';
import { NavController, ToastController, FabContainer } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//PAGINAS
import { RegistroPage } from '../../index-paginas';
//clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { AuthAdministradorProvider } from '../../../providers/auth-administrador/auth-administrador';
//jQUERY
import * as $ from 'jquery';

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
  //AUDIO
  audio = new Audio();
  error_sound:string = "assets/sounds/error_sound.mp3";
  success_sound:string = "assets/sounds/success_sound.mp3";

  //CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fbLogin:FormBuilder,
              public _usuarioServicio:UsuarioServicioProvider,
              public _authServicio:AuthServicioProvider,
              public _authAdmin:AuthAdministradorProvider) {

        //this.user = afAuth.authState;
        console.log("¿Sesión activa?: " + this._authServicio.authenticated);
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

     //A- USUARIO EXISTE PERO ESTA INHABILITADO (inactivo y sin mail verificado)
              if(!this.mail_verificado && !this.usuario.activo)
                this.usuario_inhabilitado();
     //B- USUARIO CON MAIL VERIFICADO (inactivo pero con mail verificado)
              if(this.mail_verificado && !this.usuario.activo)
                this.usuario_mailVerificado();
     //C- USUARIO ACTIVO
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
        case "auth/invalid-email":
        case "auth/wrong-password":
        this.mostrarAlerta("Usuario y/o contraseña incorrecta");
        break;
        case "auth/user-not-found":
        this.mostrarAlerta("Cuenta inexistente");
        break;
      }
      this.mostrarSpinner = false;
      this.reproducirSonido(this.error_sound);
      });
  }

  //ACCIONES SEGUN ESTADO DEL USUARIO
  usuario_activo(){
    console.log("Coincidencia en el usuario!");
    this._authServicio.signInWithEmail(this.credenciales)
      .then(()=>{ this.mostrarSpinner = false; })
    // this.mostrarSpinner = false;
    // this.ingresar();
  }

  usuario_inhabilitado(){
    console.log("El usuario no está activo");
    this._authAdmin.signOutExternal()
      .then(()=>{
        this.mostrarSpinner = false;
        this.reproducirSonido(this.error_sound);
        this.mostrarAlerta("Cuenta desactiva");
      })
  }

  usuario_inexistente(){ //Usuario borrado por supervisor (falta eliminar auth)
    console.log("El usuario fue eliminado!");
    this._authAdmin.delete_externalUserAccount();
    this.reproducirSonido(this.error_sound);
    this.mostrarAlerta("Cuenta inexistente");
    this.navCtrl.setRoot(LoginPage);
  }

  usuario_mailVerificado(){
    this.usuario.activo = true;
    this._usuarioServicio.modificar_usuario(this.usuario)
      .then(()=>{
        console.log("El usuario con mail verificado ha sido activado");
        this.usuario_activo();
      })
      .catch((error)=>{
        console.log("Error al activar usuario con mail verificado: " + error);
      });
  }

  mostrarAlerta(msj:string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  reproducirSonido(sound:string){
    this.audio.src = sound;
    this.audio.load();
    this.audio.play();
  }

  registrarse(){
    this.navCtrl.push(RegistroPage);
  }

}
