import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteEncuestaPage } from './cliente-encuesta';

@NgModule({
  declarations: [
    ClienteEncuestaPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteEncuestaPage),
  ],
})
export class ClienteEncuestaPageModule {}
