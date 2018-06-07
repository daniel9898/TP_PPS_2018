import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//FORM
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
//PAGINAS
import { LoginPage } from '../../index-paginas';;
//SERVICIOS
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
//jQUERY
//import * as $ from 'jquery';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
  providers: [UsuarioServicioProvider, AuthServicioProvider]
})
export class RegistroPage {

  mostrarSpinner:boolean = false;
  //FORMS
  registroForm:FormGroup;
  //FORM inputs
  input_nombre:string;
  input_correo:string;
  input_edad:string;
  input_direccion:string;
  input_clave1:string;
  input_clave2:string;
  //FORM Adicional
  formAdicional:boolean = false;
  mostrarErrores:boolean = false;

  constructor(public navCtrl: NavController,
              public fbRegistration:FormBuilder,
              public _usuarioServicio:UsuarioServicioProvider,
              public _authServicio:AuthServicioProvider) {

    this.registroForm = this.fbRegistration.group({

      userCorreo: ['', [Validators.required, Validators.email] ],
      userClave1: ['', [Validators.required] ],
      userClave2: ['', [Validators.required] ]

    });

  }

  ionViewDidLoad() {
    console.log('Página registro cargada!');
  }

  registrarUsuario(){
    if(this.registroForm.invalid)
      this.mostrarErrores = true;
    else{
      this.volver();
    }
  }

  volver(){
    this.navCtrl.push(LoginPage);
  }

}
