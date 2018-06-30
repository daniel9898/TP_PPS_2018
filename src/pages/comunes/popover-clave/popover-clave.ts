import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
//FORM
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'page-popover-clave',
  templateUrl: 'popover-clave.html',
})
export class PopoverClavePage {

  //FORMS
  registroForm:FormGroup;
  //CREDENTIALS
  credentials:any;

  constructor(public viewCtrl:ViewController,
              public fbRegistration:FormBuilder) {

    this.registroForm = this.fbRegistration.group({

      userClave:  ['', [Validators.required] ],
      userClave1: ['', [Validators.required, Validators.minLength(6)] ],
      userClave2: ['', [Validators.required, Validators.minLength(6)] ]

    });
  }

  volver(){
    let credentials = {
      passOld:  this.registroForm.value.userClave,
      passNew: this.registroForm.value.userClave2
    }
    this.viewCtrl.dismiss(credentials);
  }

}
