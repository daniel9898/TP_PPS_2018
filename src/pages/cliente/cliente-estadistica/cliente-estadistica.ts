import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { UsuarioServicioProvider } from '../../../providers/usuario-servicio/usuario-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { ClienteEncuestaServicio } from '../../../providers/cliente-encuesta-servicio/cliente-encuesta-servicio';
//CLASES
import { Usuario } from '../../../classes/usuario';
import { Viaje } from '../../../classes/viaje';
import { Encuesta_cliente } from '../../../classes/encuesta_cliente';

@Component({
  selector: 'page-cliente-estadistica',
  templateUrl: 'cliente-estadistica.html',
})
export class ClienteEstadisticaPage {

  mostrarSpinner:boolean = false;
  estadistica:string;
  usuario:Usuario;
  viajes:Viaje[] = [];
  encuestas:Encuesta_cliente[] = [];
  encuestas_cliente:Encuesta_cliente[] = [];
  // CANVAS (data)
  public chartLabels:string[];
  public chartData:any[];
  public chartType:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _authService:AuthServicioProvider,
              private _userService:UsuarioServicioProvider,
              private _viajeService:ViajeServicio,
              private _encuestaService:ClienteEncuestaServicio) {

      this.mostrarSpinner = true;

  }

  ionViewDidLoad() {
    this._userService.traer_un_usuario(this._authService.get_userUID())
  // 1) TRAER UN USUARIO
      .then((user:any)=>{
        this.usuario = user;
  // 2) TRAER VIAJES
          this._viajeService.traer_viajes(this.usuario.id_usuario, "cliente")
          .then((viajes:any)=>{
              this.viajes = viajes;
  // 3) TRAER ENCUESTAS
              this._encuestaService.traer_encuestas(null, "todos")
              .then((encuestas:any)=>{
                this.encuestas = encuestas;
                this.generar_listaDeencuestas_cliente()
                  .then(()=>{
                    this.mostrarSpinner = false;
                  })
                  .catch((error)=>{ console.log("Error al traer encuestas del cliente: " + error) })
              }).catch((error)=>{ console.log("Error al traer encuestas: " + error) })
          }).catch((error)=>{ console.log("Error al traer viajes: " + error) })
      }).catch((error)=>{ console.log("Error al traer usuario: " + error) })
  }

  generar_listaDeencuestas_cliente(){
    let promesa = new Promise((resolve, reject)=>{
        //console.log("Encuestas!: " + JSON.stringify(encuestas));
        for(let encuesta of this.encuestas){
          for(let viaje of this.viajes){
            if(encuesta.id_viaje == viaje.id_viaje)
              this.encuestas_cliente.push(encuesta);
          }
        }
        resolve();
    });
    return promesa;
  }

  cambioSegmento(event){
    console.log("Valor de opcion: " + this.estadistica);
    this.generar_resultados(this.estadistica);
  }

  generar_resultados(opcion:string){
    let count1:number=0, count2:number=0, count3:number=0, count4:number=0, count5:number=0;

    switch(opcion){
      case "individual":
      for(let encuesta of this.encuestas_cliente){
        switch(encuesta.pregunta_1){
          case 1: count1++; break;
          case 2: count2++; break;
          case 3: count3++; break;
          case 4: count4++; break;
          case 5: count5++; break;
        }
      }
      break;
      case "general":
      for(let encuesta of this.encuestas){
        switch(encuesta.pregunta_1){
          case 1: count1++; break;
          case 2: count2++; break;
          case 3: count3++; break;
          case 4: count4++; break;
          case 5: count5++; break;
        }
      }
      break;
    }

    this.chartData = [count1,count2,count3,count4,count5];
    this.chartLabels = ['Excelente', 'Eficiente', 'Regular', 'Deficiente', 'Nefasto'];
    this.chartType = 'doughnut';
  }

}
