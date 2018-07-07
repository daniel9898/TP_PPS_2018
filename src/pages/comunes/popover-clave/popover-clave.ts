import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
//FORM
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

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

  constructor(public navParams:NavParams,
              public viewCtrl:ViewController,
              public fbRegistration:FormBuilder) {

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
