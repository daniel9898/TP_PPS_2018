import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { vehiculo } from '../../../classes/vehiculo.model';

/**
 * Generated class for the SupervisorRegistroVehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-registro-vehiculo',
  templateUrl: 'supervisor-registro-vehiculo.html',
})
export class SupervisorRegistroVehiculoPage {
  vehiculo: vehiculo;
  isEditable: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vehiculo = new vehiculo();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorRegistroVehiculoPage');
    if(this.navParams.data.vehiculo){
      this.vehiculo = this.navParams.data.vehiculo;
    }
    this.isEditable = this.navParams.data.isEditable
  }

  enableEdit() {
    this.isEditable = true;
  }

}
