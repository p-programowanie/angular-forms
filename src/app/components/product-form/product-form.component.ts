import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Dictionary } from './../../models/dictionary.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent {
  @Input() categories!: Dictionary[];

  constructor(public controlContainer: ControlContainer) { }
}
