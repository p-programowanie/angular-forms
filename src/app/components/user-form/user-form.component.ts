import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserFormComponent),
      multi: true
    }
  ]
})
export class UserFormComponent implements ControlValueAccessor, Validator, OnInit {
  form!: FormGroup;
  onTouched: any = () => { };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  /* ControlValueAccessor */

  writeValue(value: User): void {
    if (value) {
      this.form.setValue(value);
    }
  }
  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  /* Validator */

  validate(control: AbstractControl): ValidationErrors {
    if (this.form.valid) {
      return null;
    }
    return { user_form_invalid: true };
  }
}
