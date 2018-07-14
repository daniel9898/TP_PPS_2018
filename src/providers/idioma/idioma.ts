
import { Injectable } from '@angular/core';
//STORAGE
import { Storage } from '@ionic/storage';
//IDIOMA
import { Idioma } from '../../assets/data/idioma/es';//-----ESPAÑOL
import { Idioma_en } from '../../assets/data/idioma/en';//--INGLÉS

@Injectable()
export class IdiomaProvider {

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
            console.log("LANGUAGE GET: " + JSON.stringify(lang));
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

      case "de":  this.idioma = Idioma_en.en;
                  break;

      case "ru":  this.idioma = Idioma_en.en;
                  break;

      case "fr":  this.idioma = Idioma_en.en;
                  break;

      case "pt":  this.idioma = Idioma_en.en;
                  break;
    }
  }

  getIdioma(){
    return this.idioma;
  }

}
