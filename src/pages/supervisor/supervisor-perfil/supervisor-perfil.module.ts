import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorPerfilPage } from './supervisor-perfil';

@NgModule({
  declarations: [
    SupervisorPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorPerfilPage),
  ],
})
export class SupervisorPerfilPageModule {}
