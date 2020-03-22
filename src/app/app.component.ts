import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { Dictionary } from './models/dictionary.model';
import { DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <app-order-form (formChange)="formChange($event)" [initialValue]="initialValue" [categories]="categories$ | async"></app-order-form>
      <button (click)="save()" class="btn" [disabled]="!form?.isValid"
        [ngClass]="{'btn-success': form?.isValid, 'btn-secondary': !form?.isValid}">Save</button>

      <div class="mt-5">
        value: {{form?.value | json}}<br>
        isValid: {{form?.isValid}}<br>
        isPristine: {{form?.isPristine}}<br>
      </div>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  categories$!: Observable<Dictionary[]>;
  initialValue!: Partial<Order>;
  form!: { isValid: boolean, isPristine: boolean, value: Order };

  constructor(private dictionarService: DictionaryService) { }

  ngOnInit() {
    this.categories$ = this.dictionarService.getCategories();

    this.initialValue = {
      name: 'Default product name',
      firstname: 'Default user name'
    };
  }

  formChange(value: { isValid: boolean, isPristine: boolean, value: Order }) {
    this.form = value;
  }

  save() {
    alert(JSON.stringify(this.form.value));
  }
}
