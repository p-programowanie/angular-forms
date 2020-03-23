import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormState, Vendor } from './components/forms/vendor/vendor.model';
import { Dictionary, DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <app-vendor
        [vendorTypes]="vendorTypes$ | async"
        [initialValue]="initialValue"
        (formState)="formStateChange($event)">
      </app-vendor>

      <button (click)="save()" class="btn" [disabled]="!formState?.isValid"
        [ngClass]="{'btn-success': formState?.isValid, 'btn-secondary': !formState?.isValid}">Save</button>

        <br><br>formValid: {{formState?.isValid}}<br>
        formPristine: {{formState?.isPristine}}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  vendorTypes$!: Observable<Dictionary[]>;
  formState!: FormState<Vendor>;

  initialValue: Partial<Vendor> = {
    vendorType: {
      isForeigner: false,
      typeId: 2
    }
  };

  constructor(private dictionarService: DictionaryService) { }

  ngOnInit() {
    this.vendorTypes$ = this.dictionarService.getVendorTypes();
  }

  formStateChange(formState: FormState<Vendor>) {
    this.formState = formState;
  }

  save() {
    alert(JSON.stringify(this.formState.value));
  }
}
