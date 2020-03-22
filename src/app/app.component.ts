import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { Dictionary } from './models/dictionary.model';
import { DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <app-order-form [categories]="categories$ | async"></app-order-form>
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
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(OrderFormComponent) orderForm: OrderFormComponent;

  categories$!: Observable<Dictionary[]>;

  constructor(
    private dictionarService: DictionaryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.categories$ = this.dictionarService.getCategories();
  }

  ngAfterViewInit() {
    this.orderForm.setValue({
      name: 'Default product name',
      firstname: 'Default user name'
    });
    this.cdr.detectChanges();
  }

  save() {
    alert(this.orderForm.value);
  }
}
