import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
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
import { Dictionary } from 'src/app/models/dictionary.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductFormComponent),
      multi: true
    }
  ]
})
export class ProductFormComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() categories!: Dictionary[];
  @Input() formGroup!: FormGroup;

  form!: FormGroup;
  onTouched: any = () => { };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: [0, Validators.required],
      price: [0, Validators.required]
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
    return { user: 'User form invalid' };
  }
}
