import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

 viaje :any;

  constructor(
    public nav_params: NavParams,
    public viewCtrl: ViewController
  ) {


    this.viaje = this.nav_params.get('viaje');
    console.log('viaje en modal ',this.viaje);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
