import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { Dictionary } from 'src/app/models/dictionary.model';
import { Order } from 'src/app/models/order.model';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnDestroy, AfterViewInit {
  @ViewChild(ProductFormComponent) productForm: ProductFormComponent;
  @ViewChild(UserFormComponent) userForm: UserFormComponent;
  @Input() categories!: Dictionary[];

  value!: Order;
  subscriptions: Subscription[] = [];
  isPristine = false;
  isValid = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnDestroy() {
    this.subscriptions.forEach(e => !e.closed ? e.unsubscribe() : null);
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      merge(
        this.productForm.productForm.valueChanges,
        this.userForm.userForm.valueChanges
      ).subscribe(_ => this.refreshFormState())
    );
    this.cdr.detectChanges();
  }

  setValue(value: Partial<Order>) {
    this.productForm.productForm.patchValue({
      name: value.name || null,
      categoryId: value.categoryId || null,
      price: value.price || null,
    });
    this.userForm.userForm.patchValue({
      firstname: value.firstname || null,
      lastname: value.lastname || null,
      email: value.email || null,
    });
  }

  private refreshFormState() {
    this.value = {
      ...this.userForm.userForm.getRawValue(),
      ...this.productForm.productForm.getRawValue()
    };
    this.isPristine = this.userForm.userForm.pristine && this.productForm.productForm.pristine;
    this.isValid = this.userForm.userForm.valid && this.productForm.productForm.valid;
  }

}
