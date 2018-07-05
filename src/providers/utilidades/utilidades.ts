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

  public showToast(msg : string, dismissFunction?: any) {
     
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
    });
    toast.onDidDismiss((dismissFunction) ? dismissFunction() : "" );
    toast.present();
  }

  public showErrorToast(msg : string, dismissFunction?: any) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      // showCloseButton:true,
      position: 'top',
      cssClass:'error-toast'
    });
    toast.onDidDismiss((dismissFunction) ? dismissFunction() : "" );
    toast.present();
  }

  public showWarningToast(msg : string, dismissFunction?: any) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      // showCloseButton:true,
      position: 'top',
      cssClass:'warning-toast'
    });
    toast.onDidDismiss((dismissFunction) ? dismissFunction() : "" );
    toast.present();
  }


  /**
   * Muestra toast pasando opciones
   * @param msg Mensaje del toast
   * @param options Opciones (sin el mensaje)
   * @param dismissFunction Función de cuando finaliza el toats
   */
  public showToastOtps(msg: string, options: any, dismissFunction?: any){
    let toast = this.toastCtrl.create(options);
    toast.setMessage(msg);
    toast.onDidDismiss((dismissFunction) ? dismissFunction() : null );
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
