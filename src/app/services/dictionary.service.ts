import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  getSizes() {
    return of([
      { key: 'Tiny', value: 1 },
      { key: 'Small', value: 2 },
      { key: 'Medium', value: 3 },
      { key: 'Big', value: 4 },
    ]);
  }

  getCategories() {
    return of([
      { key: 'Clothes', value: 1 },
      { key: 'Books', value: 2 },
      { key: 'Food', value: 3 },
      { key: 'Tools', value: 4 },
    ]);
  }
}
