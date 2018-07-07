import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController} from 'ionic-angular';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
//import * as firebase from 'firebase/app';
import { ChoferViajePage } from '../../index-paginas';
import { Subscription } from 'rxjs/Subscription';
import { UtilidadesProvider } from '../../../providers/utilidades/utilidades';
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-lista-viajes',
  templateUrl: 'lista-viajes.html',
})
export class ListaViajesPage {

  viajes : any;
  chofer : any;
  viajesSubsc : Subscription;
  viajeAsignado = [];
  usuarioSesion:any;
  usersSubs : Subscription;
  viajesSubs : Subscription;
  viaje: any;

  constructor(public navCtrl: NavController,
              public viajesProv : ViajeServicio,
              public userProv: UsuarioServicioProvider,
              public menu: MenuController,
              public utils: UtilidadesProvider,
              public aut : AuthServicioProvider) {

    this.menu.enable(true);
    this.usuarioSesion = firebase.auth().currentUser;

    this.usersSubs = this.userProv.getUsers().subscribe(
      lista => {
        this.chofer = lista.filter(v => v.id_usuario == this.usuarioSesion.uid);
        console.log('this.chofer ',this.chofer);

        if(this.chofer[0].id_viaje != '' && this.chofer[0].id_viaje != null){

            this.viajesSubs = this.viajesProv.getAllTrips().subscribe(
                lista => {
                    this.viaje = lista.filter(v => v.id_viaje == this.chofer[0].id_viaje)[0];
                    console.log('this.viaje ',this.viaje);
                    
                    this.viaje.id_vehiculo = this.chofer[0].id_vehiculo;
                    this.viajesProv.modificar_viaje(this.viaje)
                    .then(v =>{

                        this.utils.showToast('Tiene un viaje Asignado !!');
                        this.navCtrl.push(ChoferViajePage,{viaje :this.viaje});

                    } )
                    .catch(error => console.log('error ',error))


      
                },
                error => this.utils.showErrorToast('Atención ! ' + error.json())
            )
        }
      },
      error => this.utils.showErrorToast('Atención ! ' + error.json())
    )

  }
  //VERFICAR QUE TENGA UN AUTO ASIGNADO 
  ionViewDidLoad(){
     
    this.traerViajes();
     
    //this.usuarioSesion = firebase.auth().currentUser;
    this.traerUsuario().then( d=> {
      this.chofer = d;
     }).catch(e => console.log("error ",e))

  }

  //cancelado / pendiente / tomado / en curso / cumplido
  traerUsuario(){
    return  this.userProv.traerUsuario(this.aut.get_userUID());
  }

  traerViajes(){
  	//'pendiente','estado'
    //this.viajeAsignado = null;
    this.viajesSubsc = this.viajesProv.traerViajes()
    .subscribe(
      viajes => {
        this.viajes = viajes.filter(v => v.estado == 'pendiente');
        this.viajeAsignado = this.viajes.filter(v => v.id_chofer == this.aut.get_userUID());
      
      },
      error =>  console.log("error ",error)
    )

    if(this.viajeAsignado.length>0){

       console.log("Viaje asignado ",this.viajeAsignado);
       this.conViajeAsignado(this.viajeAsignado[0]);
       this.utils.showToast('Tiene un Viaje Asignado !','success');
    }                     
    console.log("Viajes ",this.viajes);
  }

  async conViajeAsignado(viaje:any){
    
    console.log("this.chofer.id_vehiculo ",this.chofer.id_vehiculo);
    viaje.id_vehiculo = this.chofer.id_vehiculo;
    viaje.estado = 'tomado';
    await this.viajesProv.modificar_viaje(viaje);
    this.navCtrl.push(ChoferViajePage, {viaje: viaje, chofer: this.chofer});
  }

  async viajeSeleccionado(viaje:any){
    
    viaje.id_chofer = this.chofer.id_usuario;
    viaje.id_vehiculo = this.chofer.id_vehiculo;
    viaje.estado = 'tomado';
    await this.viajesProv.modificar_viaje(viaje);
    this.navCtrl.push(ChoferViajePage, {viaje: viaje, chofer: this.chofer});
  }

 
  ionViewWillLeave(){
    console.log("se ejecuto ionViewWillLeave");
    this.viajesSubs.unsubscribe();
  
  }

  

}
