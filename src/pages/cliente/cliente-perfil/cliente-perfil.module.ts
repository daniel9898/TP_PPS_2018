import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientePerfilPage } from './cliente-perfil';

@NgModule({
  declarations: [
    ClientePerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientePerfilPage),
  ],
})
export class ClientePerfilPageModule {}
