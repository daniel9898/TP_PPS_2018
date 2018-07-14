import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheetOptions } from 'ionic-angular';
import { ThemeSettingsProvider } from '../../../providers/theme-settings/theme-settings';

/**
 * Generated class for the ConfiguracionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuraciones',
  templateUrl: 'configuraciones.html',
})
export class ConfiguracionesPage {
  isCustom = false;
  font: string = '';
  fontSize: string = '';
  headerColor: string = '';
  headerFontColor: string = '';
  itemsBackgroundColor: string = '';
  itemsListBackgroundColor: string = '';
  background:string = '';
  ionSelectOptions: ActionSheetOptions = { cssClass: 'naif-theme' };
  soundSet: string;
  // fontSelectOptions: ActionSheetOptions;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public themeSetting: ThemeSettingsProvider,
    public actionSheetCtrl: ActionSheetController) {
    this.themeSetting.getActiveTheme().subscribe(val => this.ionSelectOptions.cssClass = val.toString());
    // this.presentActionSheet()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionesPage');
  }

  setTheme(texto: string) {
    console.log('click en el set theme');
    this.themeSetting.setActiveTheme(texto);
  }

  onChangeConfiguration() {
    console.log('test change select');
    this.contruirCustom()
  }

  contruirCustom() {
    const space = ' ';
    let classes =
      this.font + space +
      this.fontSize + space +
      this.headerColor + space +
      this.headerFontColor + space +
      this.itemsBackgroundColor + space +
      this.itemsListBackgroundColor + space +
      this.background;
    this.themeSetting.setActiveTheme(classes);
  }

  setButtonValue(value:string){
    this.background = value;
    this.contruirCustom();
  }

}
