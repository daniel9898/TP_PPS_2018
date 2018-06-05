import { Component } from '@angular/core';
import { NavController, ToastController, FabContainer } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//PAGINAS
import { ClienteInicioPage, ChoferInicioPage, SupervisorInicioPage, RegistroPage } from '../index-paginas';
//FIREBASE
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import{ Observable } from 'rxjs/Observable';
//SERVICIOS
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../providers/auth-servicio/auth-servicio';
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
  flag:boolean = false;
  focus1:boolean = false;
  focus2:boolean = false;
  userNameTxt:string;
  userPassTxt:string;
  usuariosDePrueba:any[] = [];
  //emailFormat:string = '^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i';
  audio = new Audio();
  //CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fbLogin:FormBuilder,
              public afAuth:AngularFireAuth,
              public afDB: AngularFireDatabase,
              public _usuarioServicio:UsuarioServicioProvider,
              public _authServicio:AuthServicioProvider) {

        //this.user = afAuth.authState;
        console.log("Sesion activa?: " + this.afAuth.auth.currentUser);
        this.userNameTxt = "";
        this.userPassTxt = null;
        this.myLoginForm = this.fbLogin.group({
          userEmail: ['', [Validators.required, Validators.email]],
          userPassword: ['', [Validators.required]],
        });
  }

  //INICIO
  ionViewDidEnter(){
    console.log("Página cargada!");

  }

  //METODOS
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

    this._authServicio.signInWithEmail(credenciales)
      .then(value => {
        //console.log('Funciona!' + JSON.stringify(value));
      })
      .catch(err => {
        console.log('Algo salió mal: ',err.message);
        this.reproducirSonido();
        this.mostrarSpinner = false;
        this.mostrarAlerta();
      })
      .then(()=>{ //Una vez validado el usuario asignar perfil
          this._usuarioServicio.traer_usuarios().then(()=>{
              //console.log("USUARIOS: " + JSON.stringify(this._usuarioServicio.usuariosArray));
              for(let user of this._usuarioServicio.usuariosArray){
                if(user.correo == this.myLoginForm.value.userEmail){
                  this.usuario_perfil = user.perfil;
                  this.usuario_foto = user.foto;
                }
              }
              this.ingresar();
          }).catch((error)=>{
            console.log("Ocurrió un error al traer usuarios!: " + JSON.stringify(error));
          })
      });
  }

  ingresar(){
    this.userActive = this._authServicio.get_userData();
    this.userActive.updateProfile({
      displayName: this.usuario_perfil,
      photoURL: this.usuario_foto
    }).then(value => {
      // Update successful.
      this.mostrarSpinner = false;
      switch(this.usuario_perfil){
        case "cliente":
        this.navCtrl.push(ClienteInicioPage);
        break;
        case "chofer":
        this.navCtrl.push(ChoferInicioPage);
        break;
        case "supervisor":
        case "superusuario":
        this.navCtrl.push(SupervisorInicioPage);
        break;
      }
    })
    .catch(err => {
      console.log('Algo salió mal: ',err.message);
      this.reproducirSonido();
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

  mostrarAlerta(){
    let toast = this.toastCtrl.create({
      message: 'Usuario y/o contraseña incorrectos!',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  reproducirSonido(){
    this.audio.src = "assets/sounds/windows_95_error.mp3";
    this.audio.load();
    this.audio.play();
  }

  registrarse(){
    this.navCtrl.push(RegistroPage);
  }

}
