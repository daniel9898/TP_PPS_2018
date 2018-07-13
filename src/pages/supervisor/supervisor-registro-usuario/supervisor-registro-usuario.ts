import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//PAGINAS
import { SupervisorRegistroClientePage, SupervisorRegistroChoferPage } from '../../index-paginas';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@Component({
  selector: 'page-supervisor-registro-usuario',
  templateUrl: 'supervisor-registro-usuario.html',
})
export class SupervisorRegistroUsuarioPage {

  alta_cliente:any;
  alta_chofer:any;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
         //IDIOMA
         this.cargar_idioma();
         this.alta_cliente = SupervisorRegistroClientePage;
   	     this.alta_chofer = SupervisorRegistroChoferPage;
  }

  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }
  //CARGAR IDIOMA
  cargar_idioma(){
    this.idioma = Idioma.es;
  }

}
