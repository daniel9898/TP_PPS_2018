import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaViajesPage } from './lista-viajes';

@NgModule({
  declarations: [
    ListaViajesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaViajesPage),
  ],
})
export class ListaViajesPageModule {}
