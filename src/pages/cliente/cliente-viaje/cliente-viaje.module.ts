import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteViajePage } from './cliente-viaje';

@NgModule({
  declarations: [
    ClienteViajePage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteViajePage),
  ],
})
export class ClienteViajePageModule {}
