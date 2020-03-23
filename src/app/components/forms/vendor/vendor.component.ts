import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Dictionary } from 'src/app/services/dictionary.service';
import { VendorBusinessLogicService } from './vendor-business-logic.service';
import { FormState, Vendor } from './vendor.model';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VendorBusinessLogicService]
})
export class VendorComponent implements OnInit, OnDestroy {
  @Output() formState = new EventEmitter<FormState<Vendor>>(true);
  @Input() vendorTypes!: Dictionary[];
  @Input() initialValue!: any;

  form!: FormGroup;
  private subscription!: Subscription;

  constructor(public businessLogic: VendorBusinessLogicService) { }

  ngOnInit() {
    this.form = this.businessLogic.createForm(this.initialValue);

    this.subscription = this.form.valueChanges.subscribe(value => {
      this.businessLogic.applyBusinessLogic(value);
      this.emitFormState();
    });

    this.emitFormState();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private emitFormState() {
    this.formState.emit({
      isValid: this.form.valid,
      isPristine: this.form.pristine,
      value: this.form.value
    });
  }
}
