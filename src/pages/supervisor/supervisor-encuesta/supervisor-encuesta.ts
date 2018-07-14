import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetOptions } from 'ionic-angular';
import { ThemeSettingsProvider } from '../../../providers/theme-settings/theme-settings';

/**
 * Generated class for the SupervisorEncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisor-encuesta',
  templateUrl: 'supervisor-encuesta.html',
})
export class SupervisorEncuestaPage {
  ionSelectOptions: ActionSheetOptions = { cssClass: 'naif-theme' };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public themeSetting: ThemeSettingsProvider) {
    this.themeSetting.getActiveTheme().subscribe(val => this.ionSelectOptions.cssClass = val.toString());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupervisorEncuestaPage');
  }

}
