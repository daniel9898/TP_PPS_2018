import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*
  Generated class for the ThemeSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeSettingsProvider {

  private theme: BehaviorSubject<String>;
 
  constructor() {
      this.theme = new BehaviorSubject('argentina-theme');
  }

  setActiveTheme(val) {
      this.theme.next(val);
  }

  getActiveTheme() {
      return this.theme.asObservable();
  }

}
