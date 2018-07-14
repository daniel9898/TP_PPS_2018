
import { Injectable } from '@angular/core';
//STORAGE
import { Storage } from '@ionic/storage';
//IDIOMA
import { Idioma } from '../../assets/data/idioma/es';//-----ESPAÑOL
import { Idioma_en } from '../../assets/data/idioma/en';//--INGLÉS
import { Idioma_de} from '../../assets/data/idioma/de';//---ALEMÁN
import { Idioma_ru} from '../../assets/data/idioma/ru';//---RUSO
import { Idioma_fr} from '../../assets/data/idioma/fr';//---FRANCÉS
import { Idioma_pt} from '../../assets/data/idioma/pt';//---PORTUGUÉS
//OTROS
import { Observable } from "rxjs/Rx"


@Injectable()
export class IdiomaProvider {

  public idioma$ = new Observable((observer)=>{
    observer.next(this.idioma);
    //observer.complete();
  })
  idioma:any;

  constructor(private storage:Storage) {
    console.log('Provider idioma');
    this.initialize();
  }

  initialize(){//OBTENER DEL STORAGE
      this.storage.get('language')
      .then((lang)=>{
        if(lang !== null){
          //console.log("LANGUAGE: " + JSON.stringify(lang));
          this.selectLanguage(lang.code);
        }
        else{
            // BY DEFAULT
            this.idioma = Idioma.es;
        }
      })
      .catch((error)=>{ console.log("Error al leer storage: " + error);
      })
  }

  getLanguageFromStorage(){
    let promesa = new Promise((resolve, reject)=>{
        this.storage.get('language')
        .then((lang)=>{
          if(lang !== null){
            //console.log("LANGUAGE GET: " + JSON.stringify(lang));
            this.idioma = lang;
            resolve(this.idioma);
          }
          else{
              // BY DEFAULT
              this.idioma = Idioma.es;
              resolve(this.idioma);
          }
        })
        .catch((error)=>{ console.log("Error al leer storage: " + error);
        })
    });
    return promesa;
  }

  selectLanguage(selection:string){
    switch(selection){
      case "es":  this.idioma = Idioma.es;
                  break;

      case "en":  this.idioma = Idioma_en.en;
                  break;

      case "de":  this.idioma = Idioma_de.de;
                  break;

      case "ru":  this.idioma = Idioma_ru.ru;
                  break;

      case "fr":  this.idioma = Idioma_fr.fr;
                  break;

      case "pt":  this.idioma = Idioma_pt.pt;
                  break;
    }
  }

  getIdioma(){
    return this.idioma;
  }

}
