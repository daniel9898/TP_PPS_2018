import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@IonicPage()
@Component({
  selector: 'page-supervisor-registro-chofer',
  templateUrl: 'supervisor-registro-chofer.html',
})
export class SupervisorRegistroChoferPage {

  rForm: FormGroup;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
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
      'nombre' : ['',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'apellido' : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'edad' : ['', Validators.pattern('/[0-9\+\-\ ]/')],
      'direccion' : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'perfil' : ['chofer'],
      'email' : ['', Validators.email],
      'imagen' : [''],
      'viajando' : [false]
    });
  }

}
