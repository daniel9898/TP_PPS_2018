import { Injectable } from '@angular/core';
//QR plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Injectable()
export class QrServicioProvider {

  options:any;

  constructor(private qrScanner:BarcodeScanner) {
  }

  //INICIALIZAR
  inicializar(text:string){
    this.options = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      saveHistory: true, // Android, save scan history (default false)
      prompt: text, // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      disableSuccessBeep: false // iOS and Android
    }
  }

  //METODO DE LECTURA
  lector_qr(){

    let promesa = new Promise((resolve, reject)=>{

      this.qrScanner.scan(this.options).then((result) => {
        //Detalle de lo escaneado:
        console.log("DETALLE DE LO ESCANEADO:");
        console.log("Result: " + result.text + "\n"); //!!!
        console.log("Format: " + result.format + "\n");
        console.log("Cancelled: " + result.cancelled);

        if( !result.cancelled && result.text != null){
          resolve(result.text);
        }//FIN de la validación general
      }).catch(err => {
          resolve(false);
          console.log('Error', JSON.stringify(err));
      })

    });
    return promesa;
  }

}
