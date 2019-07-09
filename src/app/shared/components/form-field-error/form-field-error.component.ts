import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
<p class="text-danger" *ngIf="mustShowErrorMessage()">
  {{errorMessage}}
</p>
 `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if(this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return 'Dado obrigatório';
    } else if (this.formControl.errors.minlength) {
      const minimo: string = this.formControl.errors.minlength.requiredLength;
      return 'O campo deve ter no mínimo ' + minimo + ' caracteres.';
    } else if (this.formControl.errors.maxlength) {
      const maximo: string  = this.formControl.errors.maxlength.requiredLength;
      return 'O campo deve ter no máximo ' + maximo + ' caracteres.';
    } else if (this.formControl.errors.email) {
      return 'Formato de e-mail inválido';
    } else {
      return null;
    }
  }

}
