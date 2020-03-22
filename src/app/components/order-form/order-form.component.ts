import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary } from 'src/app/models/dictionary.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFormComponent {
  @Output() formChange = new EventEmitter<{ isValid: boolean, isPristine: boolean, value: Order }>();
  @Input() categories!: Dictionary[];
  @Input() initialValue!: Partial<Order>;

  private userForm!: FormGroup;
  private productForm!: FormGroup;

  setProductForm(formGroup: FormGroup) {
    this.productForm = formGroup;
    this.refreshFormState();
  }

  setUserForm(formGroup: FormGroup) {
    this.userForm = formGroup;
    this.refreshFormState();
  }

  private refreshFormState() {
    const value = { ...this.userForm?.value, ...this.productForm?.value };
    const isValid = this.userForm?.valid && this.productForm?.valid;
    const isPristine = this.userForm?.pristine && this.productForm?.pristine;
    this.formChange.emit({ isValid, isPristine, value });
  }
}
