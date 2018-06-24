import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
//FORM
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[formControl][disableControl]' // Attribute selector
})
export class DisableControlDirective {

  // @Input() set disableControl( condition : boolean ) {
  //   const action = condition ? 'disable' : 'enable';
  //   this.ngControl.control[action]();
  // }
  //
  // constructor(private ngControl : NgControl) {
  //
  // }

  @Input() formControl: FormControl;

  constructor() {
  }

  @Input('disableControl') set disableControl(s: boolean) {
        if (!this.formControl) return;
        else if (s) this.formControl.disable();
        else this.formControl.enable();
  }

}
