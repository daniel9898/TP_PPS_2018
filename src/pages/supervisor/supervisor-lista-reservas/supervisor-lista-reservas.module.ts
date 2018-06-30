import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorListaReservasPage } from './supervisor-lista-reservas';

@NgModule({
  declarations: [
    SupervisorListaReservasPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorListaReservasPage),
  ],
})
export class SupervisorListaReservasPageModule {}
