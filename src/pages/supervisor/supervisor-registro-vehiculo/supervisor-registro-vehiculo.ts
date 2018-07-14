import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { vehiculo } from '../../../classes/vehiculo.model';
import { PhotoTakerPage } from '../photo-taker/photo-taker';
import { VehiculosProvider } from '../../../providers/vehiculos/vehiculos';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';
import { IdiomaProvider } from '../../../providers/idioma/idioma';

@IonicPage()
@Component({
  selector: 'page-supervisor-registro-vehiculo',
  templateUrl: 'supervisor-registro-vehiculo.html',
})
export class SupervisorRegistroVehiculoPage {
  key: string = '';
  vehiculo: vehiculo;
  isEditable: boolean = false;
  //TEXTO
  idioma:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private vehiculoSrv: VehiculosProvider,
              private _utilitiesServ:UtilidadesProvider,
              private _idiomaSrv: IdiomaProvider) {

    this.vehiculo = new vehiculo();
    this.vehiculo.patente = '';
    this.vehiculo.ano = "1995";

    //IDIOMA
    this.idioma = Idioma.es;

  }

  //CARGAR IDIOMA CADA VEZ QUE SE INGRESA
  ionViewWillEnter(){
    this.cargar_idioma();
  }
  //CARGAR IDIOMA
  cargar_idioma(){
    this._idiomaSrv.getLanguageFromStorage()
      .then((idioma)=>{
        this.idioma = idioma;
      })
  }

  ionViewDidLoad() {
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
    this._utilitiesServ.showToast(this.idioma.pag_registro_vehiculo_supervisor.mensaje);
    this.navCtrl.pop();
  }


}
