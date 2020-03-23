import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent {
  @Input() shouldRequireSwift: boolean;
  @Input() formGroup: FormGroup;
}
