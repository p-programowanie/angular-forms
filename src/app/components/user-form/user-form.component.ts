import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

export const someEmailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const validEmailRegex = /.+@.+\..+/;
    if (!validEmailRegex.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  };
};

@Component({
  selector: 'app-user-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Output() formChange = new EventEmitter<{ valid: boolean, pristine: boolean, value: User }>(true);
  @Input() isReadonly = false;

  userForm: FormGroup = new FormGroup({});
  subscription!: Subscription;

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl({ value: '', disabled: this.isReadonly }, Validators.required),
      lastname: new FormControl({ value: '', disabled: this.isReadonly }, Validators.required),
      email: new FormControl({ value: '', disabled: this.isReadonly }, [Validators.required, someEmailValidator()]),
    });

    this.subscription = this.userForm.valueChanges.subscribe(_ => this.emitFormChange());
  }

  ngOnDestroy() {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  initForm(value: User) {
    this.userForm.patchValue(value);
  }

  private emitFormChange() {
    this.formChange.emit({
      valid: this.userForm.valid,
      pristine: this.userForm.pristine,
      value: this.userForm.value
    });
  }
}
