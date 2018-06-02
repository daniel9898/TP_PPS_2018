import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorListaVehiculosPage } from './supervisor-lista-vehiculos';

@NgModule({
  declarations: [
    SupervisorListaVehiculosPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorListaVehiculosPage),
  ],
})
export class SupervisorListaVehiculosPageModule {}
