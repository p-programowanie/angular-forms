import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  getCategories() {
    return of([
      { key: 'Clothes', value: 1 },
      { key: 'Books', value: 2 },
      { key: 'Food', value: 3 },
      { key: 'Tools', value: 4 },
    ]);
  }
}
