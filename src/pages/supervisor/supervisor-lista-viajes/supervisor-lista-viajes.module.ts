import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorListaViajesPage } from './supervisor-lista-viajes';

@NgModule({
  declarations: [
    SupervisorListaViajesPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorListaViajesPage),
  ],
})
export class SupervisorListaViajesPageModule {}
