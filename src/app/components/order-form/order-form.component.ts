import { ChangeDetectorRef, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary } from 'src/app/models/dictionary.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFormComponent {
  @Input() categories!: Dictionary[];
  @Input() initialValue!: Partial<Order>;

  private userForm!: FormGroup;
  private productForm!: FormGroup;
  value: Order;
  isPristine = false;
  isValid = false;

  constructor(private cdr: ChangeDetectorRef) { }

  setProductForm(formGroup: FormGroup) {
    this.productForm = formGroup;
    this.refreshFormState();
  }

  setUserForm(formGroup: FormGroup) {
    this.userForm = formGroup;
    this.refreshFormState();
  }

  private refreshFormState() {
    this.value = { ...this.userForm?.value, ...this.productForm?.value };
    this.isValid = this.userForm?.valid && this.productForm?.valid;
    this.isPristine = this.userForm?.pristine && this.productForm?.pristine;
  }

}
