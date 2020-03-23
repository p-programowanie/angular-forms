import { EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vendor } from './vendor.model';

@Injectable()
export class VendorBusinessLogicService {
  private readonly companyType = 1;
  private readonly privateType = 2;

  private form!: FormGroup;

  hideCompanyForm!: boolean;
  hidePrivateForm!: boolean;
  requireSwift!: boolean;

  constructor(private formBuilder: FormBuilder) { }

  applyBusinessLogic(state: Partial<Vendor>) {
    if (state.vendorType?.typeId === this.companyType) {
      this.hideCompanyForm = false;
      this.hidePrivateForm = true;
      this.disableForm(this.form.controls.vendorPrivate);
      this.enableForm(this.form.controls.vendorCompany);
    } else if (state.vendorType?.typeId === this.privateType) {
      this.hideCompanyForm = true;
      this.hidePrivateForm = false;
      this.disableForm(this.form.controls.vendorCompany);
      this.enableForm(this.form.controls.vendorPrivate);
    }

    if (state.vendorType?.isForeigner === true) {
      this.requireSwift = true;
      this.enableForm(this.form.controls.payment.get('swift'));
    } else {
      this.requireSwift = false;
      this.disableForm(this.form.controls.payment.get('swift'), '');
    }
  }

  createForm(initialValue?: Partial<Vendor>) {
    this.form = this.formBuilder.group({
      vendorType: this.formBuilder.group({
        typeId: ['', Validators.required],
        isForeigner: ['']
      }),
      vendorCompany: this.formBuilder.group({
        name: ['', Validators.required],
        vatNumber: ['', Validators.required],
        taxNumber: ['', Validators.required],
        country: ['', Validators.required]
      }),
      vendorPrivate: this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        personalNumber: ['', Validators.required]
      }),
      payment: this.formBuilder.group({
        iban: ['', Validators.required],
        swift: ['', Validators.required]
      })
    });

    if (initialValue) {
      this.form.patchValue(initialValue);
    }
    this.applyBusinessLogic(this.form.value);

    return this.form;
  }

  private disableForm(form: AbstractControl, defaulValue = {}) {
    form.reset(defaulValue, { emitEvent: false });
    form.disable({ emitEvent: false });
  }

  private enableForm(form: AbstractControl) {
    form.enable({ emitEvent: false });
  }
}
