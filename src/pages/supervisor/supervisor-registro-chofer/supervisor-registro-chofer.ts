import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//PAGINAS
import { SupervisorInicioPage } from '../../index-paginas';
import { ChoferProvider } from '../../../providers/chofer/chofer';
import { UsuarioImagenProvider } from '../../../providers/usuario-imagen/usuario-imagen';
import { Camera } from '@ionic-native/camera';
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
  loading : any;
  userProfile:string = "chofer";
  viewImage  : string ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevjT5_rnSGE76WpJQLuyBb99skuZmJ3DqLGwkT8UUQopXugUrQQ';
  image : string;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams, 
  	          private fb: FormBuilder,
              private chofer: ChoferProvider,
              public camera: Camera,
              public usrFoto: UsuarioImagenProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

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
      'correo' : ['test@test.com',Validators.compose([Validators.required,Validators.email])],
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

        let credenciales = { email: this.rForm.value.correo, password: this.rForm.value.clave2};
     	  let authOk = await this.chofer.altaAuth(credenciales);


        let chofer =  this.rForm.value;

        this.image != null ?  chofer.foto = await this.usrFoto.subirImagenUsuario(authOk.user.uid,this.image) :
                              chofer.foto = this.image;
   
        delete chofer.clave1;
        delete chofer.clave2;
        
     	  let keyUser = await this.chofer.altaDb(chofer);
     	  console.log('keyUser ',keyUser);
        chofer.key = keyUser;
     	  let keyOk = await this.chofer.actualizarChofer(chofer);
     	  console.log('keyOk ',keyOk);
      
    }catch(e){
        console.log('error ',e.message);
        this.showAlert(e.message);
    }
     
  }
  

  async tomarImagen(){
    try{
  	    this.image = await this.camera.getPicture(cameraConfig);
        this.viewImage = 'data:image/jpeg;base64,'+this.image;
    }catch(e){
        console.log(e.message);
        this.showAlert(e.message);
    }
  }

  showAlert(message:string) {
    let alert = this.alertCtrl.create({
      title: 'Informe : ',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showToast(){
    let toast = this.toastCtrl.create({
      message: 'Chofer Agregado exitosamente !',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showLoading(dismissOnPageChange?:boolean) {
    this.loading = this.loadingCtrl.create({
      content: 'espere por favor...',
      dismissOnPageChange: dismissOnPageChange != null ? dismissOnPageChange : false
    });

    this.loading.present();
  }

  killLoading(){
    this.loading.dismiss();
  }

}
