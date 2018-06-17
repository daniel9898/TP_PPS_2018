import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//PAGINAS
import { SupervisorInicioPage } from '../../index-paginas';
import { ChoferProvider } from '../../../providers/chofer/chofer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { cameraConfig } from '../../../config/camera.config'; 


@IonicPage()
@Component({
  selector: 'page-supervisor-registro-chofer',
  templateUrl: 'supervisor-registro-chofer.html',
})
export class SupervisorRegistroChoferPage {

  rForm: FormGroup;
  pattern : string = "/^[0-9]+$/";
  //user : Usuario;
  userProfile:string = "chofer";
  image:string = "assets/imgs/default_chofer.png";
 
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams, 
  	          private fb: FormBuilder,
              private chofer: ChoferProvider,
              public camera: Camera,
  	          public _DomSanitizationService: DomSanitizer) {

  	this.setFormValidator();
  }

  /*
	logeo
	boton - inicio actividad
	asignacion de vehiculo
	encuesta con el qr
	lista de espera

  */
  
  setFormValidator(){
    this.rForm = this.fb.group({
      'nombre' : ['test',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'apellido' : ['test1', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'edad' : ['', Validators.pattern(this.pattern)],
      'direccion' : ['', Validators.compose([Validators.minLength(4), Validators.maxLength(15)])],
      'perfil' : ['chofer'],
      'email' : ['test@test.com',Validators.compose([Validators.required,Validators.email])],
      'foto' : [''],
      'viajando' : [false],
      'clave1' : ['123456'],
      'clave2' : ['123456'],
    });
  }

  //VOLVER ATRAS
  volver(){
    this.navCtrl.setRoot(SupervisorInicioPage);
  }

  async guardar(){
     console.log(this.rForm.value);
     try{
        let credenciales = { email: this.rForm.value.email, password: this.rForm.value.clave2 };
     	let authOk = await this.chofer.altaAuth(credenciales);
     	console.log('authOk ',authOk);
     	//ANTES DE IR ALA DB GUARDAR LA FOTO




     	let userOk = await this.chofer.altaDb(authOk.user.uid,authOk.user.email);
     	console.log('registroOk ',userOk);
     	let keyOk = await this.chofer.actualizarKey(userOk);
     	console.log('keyOk ',keyOk);
      
     }catch(e){
        console.log('error ',e.message);
     }
     
  }
  

  async tomarImagen(){
    try{
	    let base64Image = 'data:image/jpeg;base64,';
	    let imageData = await this.camera.getPicture(cameraConfig); 
	    this.image = base64Image + imageData;
	    //this.enviarImagen(tipo);
    }catch(e){
        console.log(e.message);
        //this.utilities.showAlert("Atencion!",e.message);
    }
  }

}
