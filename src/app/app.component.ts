import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dictionary } from './models/dictionary.model';
import { DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <app-order-form
        [categories]="categories$ | async"
        [sizes]="sizes$ | async">
      </app-order-form>
    </div>
  `
})
export class AppComponent implements OnInit {
  categories$!: Observable<Dictionary[]>;
  sizes$!: Observable<Dictionary[]>;

  constructor(private dictionarService: DictionaryService) { }

  ngOnInit() {
    this.categories$ = this.dictionarService.getCategories();
    this.sizes$ = this.dictionarService.getSizes();
  }
}
