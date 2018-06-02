// import { Injectable } from '@angular/core';
// import { Platform } from 'ionic-angular';
// //ONE SIGNAL (Push notification)
// import { OneSignal } from '@ionic-native/onesignal';
//
// @Injectable()
// export class PushOneSignalProvider {
//
//   constructor(private oneSignal: OneSignal,
//               private platform:Platform) {
//
//     console.log('PUSH Notification provider inyectado!');
//     this.push_notification();
//   }
//
//   push_notification(){
//     if(this.platform.is('cordova')){
//       this.oneSignal.startInit('fe93979c-6c62-4671-bc55-101e5241f683', '192475207026');
//
//       this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
//
//       this.oneSignal.handleNotificationReceived().subscribe(() => {
//        // do something when notification is received
//        console.log("Se recibió push!!!");
//       });
//
//       this.oneSignal.handleNotificationOpened().subscribe(() => {
//         // do something when a notification is opened
//         console.log("Se abrió la notificación!!");
//       });
//
//       this.oneSignal.endInit();
//
//     }else{
//       console.log("Plugin cordova not available -> Prueba realizada desde una PC");
//     }
//
//   }
//
//   send_tag(perfil:string){
//     this.oneSignal.sendTag('profile', perfil);
//   }
//
//   delete_tag(){
//     this.oneSignal.deleteTag('profile');
//   }
//
// }
