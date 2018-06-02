import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorEncuestaPage } from './supervisor-encuesta';

@NgModule({
  declarations: [
    SupervisorEncuestaPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorEncuestaPage),
  ],
})
export class SupervisorEncuestaPageModule {}
