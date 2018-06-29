import { Injectable } from '@angular/core';
//QR plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Injectable()
export class QrServicioProvider {

  constructor(private qrScanner:BarcodeScanner) {

  }

  //METODO DE LECTURA
  lector_qr(){

    let promesa = new Promise((resolve, reject)=>{

      this.qrScanner.scan().then((result) => {
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
