import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { vehiculo, vehiculosMock } from '../../../classes/vehiculo.model';
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
  public vehiculos: vehiculo[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private vehiculosSrv: VehiculosProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SupervisorListaVehiculosPage');
    // this.vehiculos = vehiculosMock;
    this.initializeItems();
  }

  initializeItems(){
    this.vehiculos = vehiculosMock;
    this.vehiculosSrv.getListaVehiculos().subscribe(next => {
      console.log(next);
      // this.vehiculos = next.key;
    });
    // .then(value =>{
    //   this.vehiculos = value
    //   console.log(value);
    // });
  }



  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.vehiculos = this.vehiculos.filter((item) => {
        return (item.marca.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.modelo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  verVehiculo(value){
    console.log(value);
    this.navCtrl.push(SupervisorRegistroVehiculoPage,this.vehiculos[value]);
  }

}
