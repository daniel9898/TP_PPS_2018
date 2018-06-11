import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
//FORM
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
//PAGINAS
import { LoginPage } from '../../index-paginas';;
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
  providers: [UsuarioServicioProvider, AuthServicioProvider]
})
export class RegistroPage {

  mostrarSpinner:boolean = false;
  //FORMS
  registroForm:FormGroup;
  //AUDIO
  audio = new Audio();
  error_sound:string = "assets/sounds/error_sound.mp3";
  success_sound:string = "assets/sounds/success_sound.mp3";
  //NUEVO USUARIO
  userId:string;
  userEmail:string;
  userProfile:string = "cliente";
  userFoto:string = "assets/imgs/default_cliente.png";

  constructor(public navCtrl: NavController,
              public fbRegistration:FormBuilder,
              public toastCtrl: ToastController,
              public _usuarioServicio:UsuarioServicioProvider,
              public _authServicio:AuthServicioProvider) {

    this.registroForm = this.fbRegistration.group({

      userCorreo: ['', [Validators.required, Validators.email] ],
      userClave1: ['', [Validators.required, Validators.minLength(6)] ],
      userClave2: ['', [Validators.required, Validators.minLength(6)] ]

    });

  }

  //PAGINA CARGADA
  ionViewDidLoad() {
    console.log('Página registro cargada!');
  }

  registrarUsuario(){
      let credenciales = {
        email: this.registroForm.value.userCorreo,
        password: this.registroForm.value.userClave2
      };
      //REGISTRAR EN AUTHENTICATION
      this._authServicio.signUpSimple(credenciales)
      .then((data)=>{
        console.log("Datos nuevo usuario: " + JSON.stringify(data.user) );
        console.log("Datos: " + data.user.uid + " + " + data.user.email);
        this.userId = data.user.uid.toString();
        this.userEmail = data.user.email.toString();
      //REGISTRAR EN DATABASE
        this._usuarioServicio.alta_usuario_registro(this.userId, this.userEmail)
        .then((newUser)=>{
            //console.log("Valor retornado en alta: " + JSON.stringify(newUser));
            this._usuarioServicio.modificar_usuario(newUser) //Actualizar firebase key recibida
            .then(()=>{
                this._authServicio.update_userAccount(this.userProfile, this.userFoto)
                .then(()=>{
                  this.mostrarAlerta("Usuario creado!");
                  this.reproducirSonido(this.success_sound);
                  this._authServicio.signOut().then(()=>{ this.volver(); });
                })
                .catch((error)=>{
                  console.log("Error al actualizar auth info!" + error);
                });

            });
        })
        .catch((error)=>{
          console.log("Error al generar usuario en firebase!" + error);
        });
      })
      .catch((error)=>{
        console.log("Error al registrar usuario (auth): " + error);
        var errorCode = error.code;
        //var errorMessage = error.message;
        switch(errorCode){
          case "auth/email-already-in-use":
          this.mostrarAlerta("Cuenta ya existente!");
          this.registroForm.reset();
          break;
          case "auth/invalid-email":
          this.mostrarAlerta("Correo invalido!");
          break;
        }
        this.reproducirSonido(this.error_sound);
      })
  }

  reproducirSonido(sound:string){
    this.audio.src = sound;
    this.audio.load();
    this.audio.play();
  }

  mostrarAlerta(msj:string){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  volver(){
    this.navCtrl.setRoot(LoginPage);
  }

}
