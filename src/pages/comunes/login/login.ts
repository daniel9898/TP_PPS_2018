import { Component } from '@angular/core';
import { NavController, ToastController, FabContainer } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//PAGINAS
import { ClienteInicioPage, ChoferInicioPage, SupervisorInicioPage, RegistroPage } from '../../index-paginas';
//clase USUARIO
import { Usuario } from '../../../classes/usuario';
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
//jQUERY
import * as $ from 'jquery';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsuarioServicioProvider, AuthServicioProvider]
})
export class LoginPage {

  mostrarSpinner:boolean = false;
  //ATRIBUTOS
  usuario:Usuario = null;
  mail_verificado:boolean;
  update_profile:boolean;
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
              public _authServicio:AuthServicioProvider) {

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
    let credenciales = {
      email: this.myLoginForm.value.userEmail,
      password: this.myLoginForm.value.userPassword
    };

    // 1) INTENTAR LOGUEARSE
    this._authServicio.signInWithEmail(credenciales)
      .then(value => {
        console.log('Email utilizado: ' + value.user.email);
        this.mail_verificado = value.user.emailVerified;

    // 2) TRAER USUARIO
        this._usuarioServicio.traer_un_usuario_correo(credenciales.email)
        .then((user:any)=>{

   // USUARIO EXISTE
          if(user){
              console.log("Usuario traído: " + JSON.stringify(user));
              this.usuario = new Usuario(user);
   // 3) VALIDAR INGRESO

        //USUARIO EXISTE PERO ESTA INHABILITADO (inactivo y sin mail verificado)
              if(!this.mail_verificado && !this.usuario.activo)
                this.usuario_inhabilitado();
       //USUARIO CON MAIL VERIFICADO (inactivo pero con mail verificado)
              if(this.mail_verificado && !this.usuario.activo)
                this.usuario_mailVerificado();
      //USUARIO ACTIVO
              if(this.usuario.activo)
                this.usuario_activo();
          }
     //  USUARIO NO EXISTE
          else{
            this.usuario_inexistente();
          }
        })
        .catch((error)=>{
          this.mostrarSpinner = false;
          console.log("Error al traer usuario: " + error);
        })

      })
      .catch(err => {
        console.log('Error: al realizar signIn ',err.message);
        this.mostrarSpinner = false;
        this.reproducirSonido(this.error_sound);
        this.mostrarAlerta('Usuario y/o contraseña incorrectos');
      });
  }

  //ACCIONES SEGUN ESTADO DEL USUARIO
  usuario_activo(){
    console.log("Coincidencia en el usuario!");
    this.mostrarSpinner = false;
    this.ingresar();
  }

  usuario_inhabilitado(){
    console.log("El usuario no está activo");
    this._authServicio.signOut()
      .then(()=>{
        this.mostrarSpinner = false;
        this.reproducirSonido(this.error_sound);
        this.mostrarAlerta("Cuenta desactiva");
      })
  }

  usuario_inexistente(){ //Usuario borrado por supervisor (falta eliminar auth)
    console.log("El usuario fue eliminado!");
    this._authServicio.delete_userAccount();
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

  //INGRESAR A LA APLICACIÓN
  ingresar(){

      this.mostrarSpinner = false;
      switch(this.usuario.perfil){
        case "cliente":
        this.navCtrl.setRoot(ClienteInicioPage);
        break;
        case "chofer":
        this.navCtrl.setRoot(ChoferInicioPage);
        break;
        case "supervisor":
        case "superusuario":
        this.navCtrl.setRoot(SupervisorInicioPage);
        break;
      }
      //this.reproducirSonido(this.success_sound);
  }


  mostrarAlerta(msj:string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 2000,
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
