import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { vehiculo } from '../../../classes/vehiculo.model';
import { PhotoTakerPage } from '../photo-taker/photo-taker';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';

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
  key: string = '';
  vehiculo: vehiculo;
  isEditable: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private vehiculoSrv: VehiculosProvider) {
    this.vehiculo = new vehiculo();
    this.vehiculo.patente = '';
    this.vehiculo.ano = 1995;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorRegistroVehiculoPage');
    if (this.navParams.data.vehiculo) {
      this.vehiculo = this.navParams.data.vehiculo;
      this.key = this.navParams.data.key;
    }

    this.isEditable = this.navParams.data.isEditable
  }

  sacarFotos() {
    this.navCtrl.push(PhotoTakerPage, { key: this.key, vehiculo: this.vehiculo });
  }

  enableEdit() {
    this.isEditable = true;
  }

  guardar() {
    if (this.key == '') {
      this.vehiculoSrv.addItem(this.vehiculo);
    } else if (this.key !== '') {
      this.vehiculoSrv.updateItem(this.key, this.vehiculo);
    }
    this.navCtrl.pop();
  }


}
