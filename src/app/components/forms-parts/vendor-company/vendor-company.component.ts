import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vendor-company',
  templateUrl: './vendor-company.component.html'
})
export class VendorCompanyComponent {
  @Input() formGroup: FormGroup;
}
