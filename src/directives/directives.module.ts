import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DisableControlDirective } from './disable-control/disable-control';
@NgModule({
	declarations: [DisableControlDirective],
	imports: [IonicModule],
	exports: [DisableControlDirective]
})
export class DirectivesModule {}
