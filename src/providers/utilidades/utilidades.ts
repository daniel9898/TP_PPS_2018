import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class UtilidadesProvider {

 private loading : any;

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {}

  showAlert(title: string, msj: string, handler?: any) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msj,
      buttons: [
      {
        text: 'Continuar',
        role: 'cancel',
        handler: (handler != null) ?  handler : () => console.log("click alert")
      }
    ]
    });
    alert.present();
  }

  showToast(msg : string, type:string) {
     
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'top',
      cssClass:  type == 'success' ? './toast.scss' : './error.scss'
    });
    
    
    toast.present();
  }

  showLoading(dismissOnPageChange? : boolean){
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: (dismissOnPageChange != null) ? dismissOnPageChange : false
    });

    this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }

}
