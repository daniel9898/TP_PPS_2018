import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorRegistroUsuarioPage } from './supervisor-registro-usuario';

@NgModule({
  declarations: [
    SupervisorRegistroUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorRegistroUsuarioPage),
  ],
})
export class SupervisorRegistroUsuarioPageModule {}
