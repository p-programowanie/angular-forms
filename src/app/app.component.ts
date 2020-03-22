import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { Dictionary } from './models/dictionary.model';
import { DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <app-order-form (formChange)="formChange($event)" [initialValue]="initialValue" [categories]="categories$ | async"></app-order-form>
      <button (click)="save()" class="btn" [disabled]="!form?.valid"
        [ngClass]="{'btn-success': form?.valid, 'btn-secondary': !form?.valid}">Save</button>

      <div class="mt-5">
        value: {{form?.value | json}}<br>
        isValid: {{form?.valid}}<br>
        isPristine: {{form?.pristine}}<br>
      </div>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  categories$!: Observable<Dictionary[]>;
  initialValue!: Partial<Order>;
  form!: FormGroup;

  constructor(private dictionarService: DictionaryService) { }

  ngOnInit() {
    this.categories$ = this.dictionarService.getCategories();

    this.initialValue = {
      name: 'Default product name',
      firstname: 'Default user name'
    };
  }

  formChange(form: FormGroup) {
    this.form = form;
  }

  save() {
    alert(JSON.stringify(this.form.value));
  }
}
