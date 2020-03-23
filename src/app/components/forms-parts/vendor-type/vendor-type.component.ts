import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-vendor-type',
  templateUrl: './vendor-type.component.html'
})
export class VendorTypeComponent {
  @Input() formGroup: FormGroup;
  @Input() vendorTypes: Dictionary[];
}
