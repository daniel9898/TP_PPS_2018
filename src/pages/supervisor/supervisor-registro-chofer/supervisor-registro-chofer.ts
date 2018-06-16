import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-supervisor-registro-chofer',
  templateUrl: 'supervisor-registro-chofer.html',
})
export class SupervisorRegistroChoferPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorRegistroChoferPage');
  }

}
