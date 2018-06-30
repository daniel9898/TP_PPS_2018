import { Component } from '@angular/core';
import { IonicPage, NavController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//PAGINAS
import { SupervisorListaUsuariosPage } from '../../index-paginas';
import { ChoferProvider } from '../../../providers/chofer/chofer';
import { AuthAdministradorProvider } from '../../../providers/auth-administrador/auth-administrador';
import { UsuarioImagenProvider } from '../../../providers/usuario-imagen/usuario-imagen';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { Camera } from '@ionic-native/camera';
import { cameraConfig } from '../../../config/camera.config';

@IonicPage()
@Component({
  selector: 'page-supervisor-registro-chofer',
  templateUrl: 'supervisor-registro-chofer.html',
})
export class SupervisorRegistroChoferPage {

  rForm: FormGroup;
  pattern = /^[0-9]+$/;
  loading : any;
  userProfile:string = "chofer";
  viewImage  : string ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevjT5_rnSGE76WpJQLuyBb99skuZmJ3DqLGwkT8UUQopXugUrQQ';
  image : string;

  constructor(public navCtrl: NavController,
  	          private fb: FormBuilder,
              private chofer: ChoferProvider,
              public camera: Camera,
              public usrFoto: UsuarioImagenProvider,
              public utils: UtilidadesProvider,
              public _authAdmin: AuthAdministradorProvider) {

  	this.setFormValidator();
  }

  setFormValidator(){
    this.rForm = this.fb.group({
      'nombre' : [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'apellido' : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'edad' : [null, Validators.pattern(this.pattern)],
      'direccion' : [null, Validators.compose([Validators.minLength(4), Validators.maxLength(15)])],
      'perfil' : ['chofer'],
      'correo' : [null,Validators.compose([Validators.required,Validators.email])],
      'viajando' : [false],
      'clave' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      'activo' : [true],
      'foto': [null]
    });
  }

  volver(){
    this.navCtrl.push(SupervisorListaUsuariosPage);
  }

  async guardar(){
    console.log(this.rForm.value);
    this.utils.showLoading(true);
    try{

        let credenciales = { email: this.rForm.value.correo, password: this.rForm.value.clave};
     	  let authOk = await this._authAdmin.signUpExterno(credenciales);
        await this._authAdmin.update_externalUserAccount(authOk.user,this.rForm.value.perfil,'http://www.radiozero.cl/static/2018/06/capturadepantalla20180626alas22627pm-bb432d2169693c2c90256fe777dded74-1200x600-1200x500.jpg');
        await this._authAdmin.signOutExternal();
        
        let chofer =  this.rForm.value;

        this.image != null ?  chofer.foto = await this.usrFoto.subirImagenUsuario(authOk.user.uid,this.image) :
                              chofer.foto = this.viewImage;

        delete chofer.clave;

     	  let keyUser = await this.chofer.altaDb(chofer);
        chofer.key = keyUser;

        chofer.id_usuario = authOk.user.uid;
     	  await this.chofer.actualizarChofer(chofer);

        this.utils.showToast('REGISTRO EXITOSO !');
        this.navCtrl.setRoot(SupervisorListaUsuariosPage);

    }catch(e){
        this.utils.dismissLoading();
        console.log('error ',e.message);
        this.utils.showAlert('Atención ! ',e.message);
    }

  }


  async tomarImagen(){
    try{
  	    this.image = await this.camera.getPicture(cameraConfig);
        this.viewImage = 'data:image/jpeg;base64,'+this.image;
    }catch(e){
        console.log(e.message);
        this.utils.showAlert('Atención ! ',e.message);
    }
  }

}
