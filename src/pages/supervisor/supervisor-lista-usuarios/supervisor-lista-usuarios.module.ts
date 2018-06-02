import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorListaUsuariosPage } from './supervisor-lista-usuarios';

@NgModule({
  declarations: [
    SupervisorListaUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorListaUsuariosPage),
  ],
})
export class SupervisorListaUsuariosPageModule {}
