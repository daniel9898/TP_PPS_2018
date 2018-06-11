import { Component } from '@angular/core';
import { NavController, ToastController, FabContainer } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//PAGINAS
import { ClienteInicioPage, ChoferInicioPage, SupervisorInicioPage, RegistroPage } from '../../index-paginas';
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

  //ATRIBUTOS
  usuario_perfil:string = "";
  usuario_foto:string = "";
  mostrarSpinner:boolean = false;
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
  ionViewDidEnter(){
    //console.log("Página cargada!");

  }

  // //DESUSCRIBIR
  // ionViewDidLeave(){
  //   this._usuarioServicio.desuscribir();
  // }

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

  validarUsuario(){
    this.mostrarSpinner = true;
    let credenciales = {
      email: this.myLoginForm.value.userEmail,
      password: this.myLoginForm.value.userPassword
    };

    //LOGUEARSE
    this._authServicio.signInWithEmail(credenciales)
      .then(value => {
        console.log('Email utilizado: ' + value.user.email);
        this._usuarioServicio.traer_un_usuario(value.user.uid)
          .then((user:any)=>{
              console.log("USUARIO: " + JSON.stringify(user));
              //VALIDAR SI EL USUARIO EXISTE EN DB
              if(user != null){
                if(user.correo == this.myLoginForm.value.userEmail){
                  console.log("Usuario activo? : " + user.activo);
                  //USUARIO EXISTE: y está activo
                  if(user.activo){
                        this.usuario_perfil = user.perfil;
                        this.usuario_foto = user.foto;
                        console.log("Coincidencia en el usuario!");
                        this.ingresar();
                  }
                  //USUARIO EXISTE: y NO está activo
                  else{
                        console.log("El usuario fue inhabilitado");
                        this.mostrarAlerta("Cuenta inhabilitada!");
                        this.navCtrl.setRoot(LoginPage);
                  }
                }
              }
              //USUARIO NO EXISTE
              if(user == null){
                console.log("El usuario fue eliminado!");
                this._authServicio.delete_userAccount();
                this.reproducirSonido(this.error_sound);
                this.mostrarAlerta("La cuenta no existe!");
                this.navCtrl.setRoot(LoginPage);
              }
          })
          .catch((error)=>{
            console.log("Ocurrió un error al traer un usuario!: " + JSON.stringify(error));
          });
      })
      .catch(err => {
        console.log('Error: al realizar signIn ',err.message);
        this.reproducirSonido(this.error_sound);
        this.mostrarSpinner = false;
        this.mostrarAlerta('Usuario y/o contraseña incorrectos!');
      });
  }

  ingresar(){
    this._authServicio.update_userAccount(this.usuario_perfil, this.usuario_foto)
    .then(value => {
      // Update successful.
      this.mostrarSpinner = false;
      switch(this._authServicio.get_userProfile()){
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
    })
    .catch(err => {
      console.log('Algo salió mal: ',err.message);
      this.reproducirSonido(this.error_sound);
    });
  }

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
