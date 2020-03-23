import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Dictionary {
  key: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  getVendorTypes() {
    return of([
      { key: 'Company', value: 1 },
      { key: 'Private', value: 2 }
    ]);
  }
}
