import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorUsuarioPage } from './supervisor-usuario';

@NgModule({
  declarations: [
    SupervisorUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorUsuarioPage),
  ],
})
export class SupervisorUsuarioPageModule {}
