import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteHistorialPage } from './cliente-historial';

@NgModule({
  declarations: [
    ClienteHistorialPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteHistorialPage),
  ],
})
export class ClienteHistorialPageModule {}
