import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cliente-reserva',
  templateUrl: 'cliente-reserva.html',
})
export class ClienteReservaPage {
  datos : any = {
    id_cliente :'', 
    fecha_1 :'',
    origen :'',
    destino :'',
    distancia :'',
    estado :'pendiente'
  } 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteReservaPage');
  }

}
