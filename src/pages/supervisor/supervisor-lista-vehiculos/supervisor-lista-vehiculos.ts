import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { vehiculosMock } from '../../../classes/vehiculo.model';
import { SupervisorRegistroVehiculoPage } from '../../index-paginas';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';

/**
 * Generated class for the SupervisorListaVehiculosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-lista-vehiculos',
  templateUrl: 'supervisor-lista-vehiculos.html',
})
export class SupervisorListaVehiculosPage {
  public vehiculos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private vehiculosSrv: VehiculosProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SupervisorListaVehiculosPage');
    // this.vehiculos = vehiculosMock;
    this.initializeItems();
  }

  initializeItems() {
    // this.vehiculos = vehiculosMock;
    this.vehiculosSrv.getListaVehiculos().subscribe(next => {
      console.log(next);
      this.vehiculos = next;
    });
  }



  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.vehiculos = this.vehiculos.filter((item) => {
        return (item.vehiculo.marca.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.vehiculo.modelo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  verVehiculo(value) {
    console.log(value);
    this.navCtrl.push(SupervisorRegistroVehiculoPage, { isEditable: false, vehiculo: this.vehiculos[value].vehiculo });
  }

  nuevoVehiculo(){
    this.navCtrl.push(SupervisorRegistroVehiculoPage, { isEditable: true });
  }

  eliminarVehiculo(i){
    this.vehiculosSrv.deleteItem(this.vehiculos[i].key);
  }

}
