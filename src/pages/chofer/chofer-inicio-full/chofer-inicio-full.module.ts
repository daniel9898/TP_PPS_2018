import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoferInicioFullPage } from './chofer-inicio-full';

@NgModule({
  declarations: [
    ChoferInicioFullPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoferInicioFullPage),
  ],
})
export class ChoferInicioFullPageModule {}
