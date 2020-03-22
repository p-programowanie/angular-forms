import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { Dictionary } from './models/dictionary.model';
import { DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <app-order-form [initialValue]="initialValue" [categories]="categories$ | async"></app-order-form>
      <button (click)="save()" class="btn" [disabled]="!orderForm?.isValid"
        [ngClass]="{'btn-success': orderForm?.isValid, 'btn-secondary': !orderForm?.isValid}">Save</button>

      <div class="mt-5">
        value: {{orderForm?.value | json}}<br>
        isValid: {{orderForm?.isValid}}<br>
        isPristine: {{orderForm?.isPristine}}<br>
      </div>

    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild(OrderFormComponent) orderForm: OrderFormComponent;

  categories$!: Observable<Dictionary[]>;
  initialValue!: Partial<Order>;

  constructor(private dictionarService: DictionaryService) { }

  ngOnInit() {
    this.categories$ = this.dictionarService.getCategories();

    this.initialValue = {
      name: 'Default product name',
      firstname: 'Default user name'
    };
  }

  save() {
    alert(JSON.stringify(this.orderForm.value));
  }
}
