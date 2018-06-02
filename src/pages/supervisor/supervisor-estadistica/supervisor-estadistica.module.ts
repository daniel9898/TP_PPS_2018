import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorEstadisticaPage } from './supervisor-estadistica';

@NgModule({
  declarations: [
    SupervisorEstadisticaPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorEstadisticaPage),
  ],
})
export class SupervisorEstadisticaPageModule {}
