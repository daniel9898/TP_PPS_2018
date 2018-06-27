import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//PAGINAS
import { SupervisorRegistroClientePage, SupervisorRegistroChoferPage } from '../../index-paginas';

@Component({
  selector: 'page-supervisor-registro-usuario',
  templateUrl: 'supervisor-registro-usuario.html',
})
export class SupervisorRegistroUsuarioPage {

  alta_cliente:any;
  alta_chofer:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

         this.alta_cliente = SupervisorRegistroClientePage;
   	     this.alta_chofer = SupervisorRegistroChoferPage;
  }

  ionViewDidLoad() {

  }

}
