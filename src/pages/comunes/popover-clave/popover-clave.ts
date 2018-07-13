import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
//FORM
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@Component({
  selector: 'page-popover-clave',
  templateUrl: 'popover-clave.html',
})
export class PopoverClavePage {

  //FORMS
  registroForm:FormGroup;
  //VALIDACION
  cambiarClave:boolean = false;
  insertarClave:boolean = false;
  //CREDENTIALS
  credentials:any = '';
  //TEXTO
  idioma:any;

  constructor(public navParams:NavParams,
              public viewCtrl:ViewController,
              public fbRegistration:FormBuilder) {
                
    //IDIOMA
    this.cargar_idioma();
    switch(navParams.data.opcion){
      case "cambiarClave":
        this.cambiarClave = true;
        this.insertarClave = false;
        this.registroForm = this.fbRegistration.group({

          userClave:  ['', [Validators.required] ],
          userClave1: ['', [Validators.required, Validators.minLength(6)] ],
          userClave2: ['', [Validators.required, Validators.minLength(6)] ]

        });
        break;

      case "insertarClave":
        this.insertarClave = true;
        this.cambiarClave = false;
        break;
    }
  }

  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }

  //CARGAR IDIOMA
  cargar_idioma(){
    this.idioma = Idioma.es;
  }

  volver(){
    if(this.cambiarClave){
      this.credentials = {
        action: 'cambiar_clave',
        passOld:  this.registroForm.value.userClave,
        passNew: this.registroForm.value.userClave2
      }
    }
    this.viewCtrl.dismiss(this.credentials);
  }

}
