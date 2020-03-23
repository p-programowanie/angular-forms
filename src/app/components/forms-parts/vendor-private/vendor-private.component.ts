import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vendor-private',
  templateUrl: './vendor-private.component.html'
})
export class VendorPrivateComponent {
  @Input() formGroup: FormGroup;
}
