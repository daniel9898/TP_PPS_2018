import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoTakerPage } from './photo-taker';

@NgModule({
  declarations: [
    PhotoTakerPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoTakerPage),
  ],
})
export class PhotoTakerPageModule {}
