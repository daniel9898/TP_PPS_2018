import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorInicioPage } from './supervisor-inicio';

@NgModule({
  declarations: [
    SupervisorInicioPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorInicioPage),
  ],
})
export class SupervisorInicioPageModule {}
