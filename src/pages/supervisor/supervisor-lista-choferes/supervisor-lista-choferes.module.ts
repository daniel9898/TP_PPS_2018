import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorListaChoferesPage } from './supervisor-lista-choferes';

@NgModule({
  declarations: [
    SupervisorListaChoferesPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorListaChoferesPage),
  ],
})
export class SupervisorListaChoferesPageModule {}
