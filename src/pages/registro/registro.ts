import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//FORM
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
//PAGINAS
import { LoginPage } from '../index-paginas';;
//FIREBASE
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
//SERVICIOS
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../providers/auth-servicio/auth-servicio';
//jQUERY
import * as $ from 'jquery';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
  providers: [UsuarioServicioProvider, AuthServicioProvider]
})
export class RegistroPage {

  mostrarSpinner:boolean = false;
  //FORMS
  registroForm1:FormGroup;
  registroForm2:FormGroup;
  //FORM inputs
  input_nombre:string;
  input_correo:string;
  input_edad:string;
  input_direccion:string;
  input_clave:string;
  //FORM Adicional
  formAdicional:boolean = false;

  constructor(public navCtrl: NavController,
              public fbRegistration:FormBuilder,
              public afAuth:AngularFireAuth,
              public afDB: AngularFireDatabase,
              public _usuarioServicio:UsuarioServicioProvider,
              public _authServicio:AuthServicioProvider) {

    this.registroForm1 = this.fbRegistration.group({

      userCorreo: ['', [Validators.required, Validators.email] ],
      userClave: ['', [Validators.required] ]

    });

    this.registroForm2 = this.fbRegistration.group({

      userNombre: ['', [Validators.required] ],
      userEdad: ['', [Validators.required] ],
      userDireccion: ['', [Validators.required] ]

    });

  }

  ionViewDidLoad() {
    console.log('Página registro cargada!');
  }

  registrarUsuario(){

  }

  activar_formAdicional(){
    this.formAdicional = true;
  }

  volver(){
    this.navCtrl.push(LoginPage);
  }

}
