import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//CLASES
import { Viaje } from '../../../classes/viaje';
import { Encuesta_cliente } from '../../../classes/encuesta_cliente';
//SERVICIOS
import { AuthServicioProvider } from '../../../providers/auth-servicio/auth-servicio';
import { ViajeServicio } from '../../../providers/viaje-servicio/viaje-servicio';
import { ClienteEncuestaServicio } from '../../../providers/cliente-encuesta-servicio/cliente-encuesta-servicio';
import { IdiomaProvider } from '../../../providers/idioma/idioma';
//IDIOMA
import { Idioma } from '../../../assets/data/idioma/es';

@Component({
  selector: 'page-chofer-estadistica',
  templateUrl: 'chofer-estadistica.html',
})
export class ChoferEstadisticaPage {

  mostrarSpinner:boolean = false;
  viajes:Viaje[] = [];
  encuestas:Encuesta_cliente[] = [];
  encuestas_al_chofer:Encuesta_cliente[] = [];
  //TEXTO
  idioma:any;
  // CANVAS (data)
  public chartLabels:string[];
  public chartData:any[];
  public chartType:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _authService:AuthServicioProvider,
              private _viajeService:ViajeServicio,
              private _encuestaService:ClienteEncuestaServicio,
              private _idiomaSrv: IdiomaProvider) {
        //IDIOMA
        this.idioma = Idioma.es;
        this.mostrarSpinner = true;
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
    this.mostrarSpinner = true;
    this._viajeService.traer_viajes(this._authService.get_userUID(), "chofer")
      .then((viajes:any)=>{
        this.viajes = viajes;
        this.generar_lista_encuestas()
        .then(()=>{
        this.generar_lista_discriminada()
          .then(()=>{
            this.generar_grafico()
            .then(()=>{
              this.mostrarSpinner = false;
            }).catch((error)=>{ console.log("Error al generar gráfico: " + error) })
          }).catch((error)=>{ console.log("Error al traer encuestas asociadas al chofer: " + error) })
        }).catch((error)=>{ console.log("Error al traer encuestas: " + error) })
      }).catch((error)=>{ console.log("Error al traer viajes: " + error) })
  }

  generar_lista_encuestas(){
    let promesa = new Promise((resolve, reject)=>{
      this._encuestaService.traer_encuestas(null, "todos")
        .then((encuestas:any)=>{
          //console.log("Encuestas!: " + JSON.stringify(encuestas));
          this.encuestas = encuestas;
          resolve();
        })
        .catch((error)=>{ console.log("Error al traer encuestas: " + error); resolve() })
    });
    return promesa;
  }

  generar_lista_discriminada(){
    let promesa = new Promise((resolve, reject)=>{

      for(let viaje of this.viajes){
        for(let encuesta of this.encuestas){
          if(viaje.id_viaje == encuesta.id_viaje){
            this.encuestas_al_chofer.push(encuesta);
          }
        }
      }
      resolve();
    });
    return promesa;
  }

  generar_grafico(){
    let promesa = new Promise((resolve, reject)=>{
      let count1:number=0, count2:number=0, count3:number=0, count4:number=0, count5:number=0;

      for(let encuesta of this.encuestas_al_chofer){
        switch(encuesta.pregunta_2){
          case 1: count1++; break;
          case 2: count2++; break;
          case 3: count3++; break;
          case 4: count4++; break;
          case 5: count5++; break;
        }
      }
      this.chartData = [count1,count2,count3,count4,count5];
      this.chartLabels = [this.idioma.pag_estadistica_chofer.valores[1],
                          this.idioma.pag_estadistica_chofer.valores[2],
                          this.idioma.pag_estadistica_chofer.valores[3],
                          this.idioma.pag_estadistica_chofer.valores[4],
                          this.idioma.pag_estadistica_chofer.valores[5]];
      this.chartType = 'pie';
      resolve();
    });
    return promesa;
  }

}
