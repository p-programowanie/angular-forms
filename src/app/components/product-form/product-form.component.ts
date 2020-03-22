import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Dictionary } from './../../models/dictionary.model';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Output() formChange = new EventEmitter<FormGroup>();
  @Input() categories!: Dictionary[];
  @Input() sizes!: Dictionary[];
  @Input() initialValue!: Product;

  productForm!: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: [0, Validators.required],
      price: [0, Validators.required]
    });

    this.subscriptions.push(this.productForm.valueChanges.subscribe(result => {
      this.formChange.emit(this.productForm);
    }));

    this.productForm.patchValue({
      name: this.initialValue.name || null,
      categoryId: this.initialValue.categoryId || null,
      price: this.initialValue.price || null,
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(e => !e.closed ? e.unsubscribe() : null);
  }
}
