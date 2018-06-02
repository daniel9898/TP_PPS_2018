import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteEstadisticaPage } from './cliente-estadistica';

@NgModule({
  declarations: [
    ClienteEstadisticaPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteEstadisticaPage),
  ],
})
export class ClienteEstadisticaPageModule {}
