import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteInicioPage } from './cliente-inicio';

@NgModule({
  declarations: [
    ClienteInicioPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteInicioPage),
  ],
})
export class ClienteInicioPageModule {}
